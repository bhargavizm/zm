// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import URLServiceModel from "@/models/services/urlServicesSchema";


// export async function POST(req, context) {
   

//   const auth = await authUser(req);
//   if (auth.status !== 200) {
//     return new Response(JSON.stringify(auth.json), {
//       status: auth.status,
//       headers: { "Content-Type": "application/json" },
//     });
//   }


// const slug = context?.params?.slug;

//   const currentUser = auth.user;
//   try {
//     await connectDB();

//     const body = await req.json(); // ✅ No params here
//     const { url, password } = body;

//     const saved = await URLServiceModel.create({
//       serviceName: slug,
//       url,
//       password,
//       user: {
//         id: currentUser._id,
//         name: currentUser.name,
//       },
//     });

//     return Response.json(
//       {
//         success: true,
//         message: `${slug} Service Data submitted Successfully`,
//         URLServicesData: saved
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     return Response.json(
//       { success: false, error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }

import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import URLServiceModel from "@/models/services/urlServicesSchema";
import { verifyToken } from "@/utils/verifyToken";
import bcrypt from "bcrypt";

export async function POST(req, context) {
  try {
    console.log("🚀 Request received");

    const auth = await authUser(req);
    
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const user = auth.user; 
    const { slug } = context.params;
    const body = await req.json();
    const { url, password } = body;
    console.log("📦 Payload:", { url, password, slug });

    await connectDB();
    console.log("✅ Connected to DB");

    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : null;

    const result = await URLServiceModel.create({
      user: {
        id: user._id,
        name: user.name,
      },
      url,
      password: hashedPassword,
      serviceName: slug,
    });

    return new Response(
      JSON.stringify({ success: true, message: `${slug} Service Data submitted Successfully`, URLServicesData: result }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ API error:", error);
    return new Response(JSON.stringify({ error: error.message || "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
