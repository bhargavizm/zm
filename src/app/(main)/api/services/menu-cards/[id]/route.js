

// import MenuCardsServiceModel from "@/models/services/menuCardSchema";
// import { authentication } from "@/utils/authentication";

// export async function GET(request, { params }) {
//   try {
//     // const { user, errorResponse } = await authentication(request);
//     // if (errorResponse) return errorResponse;

//     const { id } = params;

//     const message = await MenuCardsServiceModel.findById(id);
//     if (!message) {
//       return new Response(JSON.stringify({
//         success: false,
//         message: "Menu Cards Data not found.",
//       }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     if (String(message.user.id) !== String(user._id)) {
//       return new Response(JSON.stringify({
//         success: false,
//         message: "Unauthorized access. This data does not belong to the  user.",
//       }), {
//         status: 403,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({
//       success: true,
//       message: "Menu Cards Data  fetched successfully.",
//       data: message,
//     }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching text message by ID:", error);
//     return new Response(JSON.stringify({
//       success: false,
//       error: error.message,
//     }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
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
