import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";

/**
 * Authenticates request and connects to MongoDB
 * @param {Request} request - The Next.js request object
 * @returns { user, errorResponse }
 */
export async function authentication(request) {
  const auth = await authUser(request);

  if (auth.status !== 200) {
    return {
      errorResponse: new Response(JSON.stringify({
        success: false,
        message: auth.json.message || "Authentication failed.",
      }), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  await connectDB();

  return { user: auth.user };
}
