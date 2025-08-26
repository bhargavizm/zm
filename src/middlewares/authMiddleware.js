// // src/middleware/authUser.js
 import jwt from "jsonwebtoken";
  import { connectDB } from "@/lib/mongoDB";
  import User from "@/models/auth/userSchema";

  export const authUser = async (req) => {
    const cookieHeader = req.headers.get("cookie"); // ✅ safe in API routes

    const token = cookieHeader
      ?.split(";")
      ?.find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return {
        status: 401,
        json: { error: "Session expired. Please log in again to continue." },
        //  technical: "Authorization token missing in cookies",
      };
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      await connectDB();

      const user = await User.findById(decoded._id);
      if (!user) {
        return {
          status: 401,
          json: { error: "We couldn't verify your account. Please log in again." },
        };
      }

      return { status: 200, user };
    } catch (err) {
      return {
        status: 401,
        json: { error: err.message || "Session expired. Please log in again." },
      };
    }

  };

export const auth = async (req) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      status: 401,
      json: { error: "Session expired. Please log in again." },
    };
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded?._id || !decoded?.email) {
      return {
        status: 401,
        json: { error: "Invalid login details. Please log in again." },
      };
    }

    await connectDB();
    const user = await User.findById(decoded._id);

    if (!user) {
      return {
        status: 401,
        json: { error: "Your account could not be found. Please sign up again." },
      };
    }

    return { status: 200, user };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return {
        status: 401,
        json: { error: "Your session has expired. Please log in again." },
      };
    }
    if (err.name === "JsonWebTokenError") {
      return {
        status: 401,
        json: { error: "Invalid session. Please log in again." },
      };
    }
    return {
      status: 401,
      json: { error: err.message || "Session expired. Please log in again."},
    };
  }
};
