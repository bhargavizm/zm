import { AudioServiceModel } from "@/models/services/encryptedServicesSchema";
import { HandleEncryptedServicesUpdate } from "../../../../common/encryptedServices/encryptedServicesUpdateRoute";



export async function PATCH(request, context) {
  const params = await context.params; // ✅ Fix #1: await context.params

  return HandleEncryptedServicesUpdate({
    request,
    model: AudioServiceModel,
    serviceName: "audios",
    params,
  });
}