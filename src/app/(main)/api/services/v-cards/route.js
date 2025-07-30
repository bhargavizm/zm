
import { VCardsModel } from "@/models/services/cardsSchema";
import { CardsServicesRoute } from "../../common/cardsServicesRoute";


export async function POST(request) {
  return CardsServicesRoute({
    request,
    model: VCardsModel,
    serviceName: "v-cards",
    imageUploadFolder: "vcards_images",
  });
}
