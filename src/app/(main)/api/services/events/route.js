// app/api/events/route.js

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import EventModel from "@/models/services/eventSchema";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";


export async function POST(request) {
  try {
    // ✅ Authenticate user
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    const user = auth.user;
    await connectDB();

    // ✅ Parse FormData
    const formData = await request.formData();

    const organizer = formData.get("organizer") || "";
    const title = formData.get("title") || "";
    const summary = formData.get("summary") || "";
    const fromDate = formData.get("fromDate") || null;
    const toDate = formData.get("toDate") || null;
    const venue = formData.get("venue") || "";
    const address = formData.get("address") || "";
    const contactName = formData.get("contactName") || "";
    const contactEmail = formData.get("contactEmail") || "";
    const contactPhone = formData.get("contactPhone") || "";
    const bgDesign = formData.get("bgDesign") || "";
    const password = formData.get("password") || "";
    const renewalDate = formData.get("renewalDate") || null;
    const status = formData.get("status") || "active";

    // ✅ Handle Location (JSON inside FormData)
    let location = {};
    if (formData.get("location")) {
      try {
        location = JSON.parse(formData.get("location"));
      } catch {
        location = {};
      }
    }

    // ✅ Password Hashing
    let hashedPassword = "";
    if (password && password.trim().length >= 4) {
      hashedPassword = await bcrypt.hash(password.trim(), 10);
    } else if (password && password.trim().length < 4) {
      return new Response(
        JSON.stringify({ success: false, error: "Password must be at least 4 characters long." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Handle Multiple File Uploads to Cloudinary
    const uploadedFiles = [];
    const files = formData.getAll("files"); // Expecting input name="files"

    for (const file of files) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploaded = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: "events" }, // optional: put files under "events/" folder
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });

        uploadedFiles.push({
          url: uploaded.secure_url,
          name: file.name,
        });
      }
    }

    // ✅ Create Event
    const newEvent = new EventModel({
      user: {
        id: user._id,
        name: user.name,
      },
      organizer,
      title,
      summary,
      fromDate,
      toDate,
      venue,
      address,
      contactName,
      contactEmail,
      contactPhone,
      bgDesign,
      password: hashedPassword,
      files: uploadedFiles, // ✅ Save uploaded files array
      qrCodeDetails: {
        qrCodeImage: formData.get("qrCodeImage") ?? "",
        location: {
          latitude: location.latitude ?? null,
          longitude: location.longitude ?? null,
          address: location.address ?? "",
        },
        renewalDate,
        status,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    await newEvent.save();
    const qrUrl = await getShortenedUrl(`/events/${newEvent._id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Event created successfully.",
        data: newEvent,
        qrUrl,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Event creation error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
