
import { PDFServiceModel } from "@/models/services/encryptedServicesSchema";
import { HandleEncryptedServices } from "../../common/encryptedServices/encryptedServicesRoute";


export async function POST(request) {
  return HandleEncryptedServices({
    serviceName:"pdf",
    request,
    model: PDFServiceModel,
    useCloudinary: true,
    mediaField: "files",
    allowedMimeTypes: null, // allow any file type (pdf, docx, zip, etc.)
  });
}


