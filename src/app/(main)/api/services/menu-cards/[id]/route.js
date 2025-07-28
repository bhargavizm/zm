import MenuCardsServiceModel from "@/models/services/menuCardSchema";
import { connectDB } from "@/lib/mongoDB";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const message = await MenuCardsServiceModel.findById(id);

    if (!message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Menu Card data not found.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Menu Card data fetched successfully.",
        data: message,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("GET /menu-cards/:id error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}