// src/middleware/authUser.js
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongoDB";
import userDetailsModel from "@/models/userDetailsModel";

// ✅ Works inside API route functions
export const authUser = async (req) => {
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return {
      status: 401,
      json: { error: "Auth token is required" },
    };
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return {
      status: 401,
      json: { error: "Invalid token format" },
    };
  }

  try {
    const { _id, role, email } = jwt.verify(token, process.env.JWT_TOKEN);

    if (!_id || !role || !email) {
      return {
        status: 401,
        json: { error: "Invalid token" },
      };
    }

    await connectDB();
    const user = await userDetailsModel.findById(_id);

    if (!user) {
      return {
        status: 401,
        json: { error: `${role} Id not found` },
      };
    }

    return {
      status: 200,
      user,
    };
  } catch (err) {
    return {
      status: 401,
      json: { error: "Request is not authorized! Please check the token" },
    };
  }
};
