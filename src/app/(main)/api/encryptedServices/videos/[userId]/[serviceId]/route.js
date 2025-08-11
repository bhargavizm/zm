import { HandleEncryptedServicesUpdate } from "@/app/(main)/api/common/encryptedServices/encryptedServicesUpdateRoute";
import { VideoServiceModel } from "@/models/services/encryptedServicesSchema";



export async function PATCH(request, context) {
  const params = await context.params; // ✅ Fix #1: await context.params

  return HandleEncryptedServicesUpdate({
    request,
    model: VideoServiceModel,
     serviceName:"videos",
    params,
  });
}