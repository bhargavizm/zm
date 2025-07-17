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
        json: { error: "Your session has expired or is invalid. Please log in again." },
      };
    }

  };


// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/mongoDB";
// import User from "@/models/auth/userSchema";

// export const authUser = async (req) => {
//   const authHeader = req.headers.get("authorization");

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return {
//       status: 401,
//       json: { error: "Authorization token missing or malformed" },
//     };
//   }

//   const token = authHeader.split(" ")[1];
// console.log('token',authHeader,'fdfs', token)
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_TOKEN);
// console.log('decoded', decoded)
//     if (!decoded?._id || !decoded?.email) {
//       return {
//         status: 401,
//         json: { error: "Invalid token payload" },
//       };
//     }

//     await connectDB();
//     const user = await User.findById(decoded._id);
//     console.log("User found:", user);

//     if (!user) {
//       return {
//         status: 401,

//         json: { error: `User not found` },

//         json: { error: User not found },

//       };
//     }

//     return {
//       status: 200,
//       user, // contains _id, name, email, etc.
//     };
//   } catch (err) {
//     return {
//       status: 401,
//       json: { error: "Token expired or invalid" },
//     };
//   }
// };
// src/middleware/authUser.js

 
