
import { AudioServiceModel } from "@/models/services/encryptedServicesSchema";
import { HandleEncryptedServices } from "../../common/encryptedServices/encryptedServicesRoute";
import { HandleEncryptedServicesUpdate } from "../../common/encryptedServices/encryptedServicesUpdateRoute";


export const audioMimeTypes = [
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/webm",
  "audio/mp3",
  "audio/flac",
  "audio/x-wav",
  "audio/aiff",
   "audio/x-aiff",
   "audio/aac",
   "audio/mp4", 
   "audio/x-m4a",
   "audio/x-ms-wma",
   "audio/opus"
];

export async function POST(request) {
  return HandleEncryptedServices({
    serviceName:"audios",
    request,
    model: AudioServiceModel,
    useCloudinary: true,
    mediaField: "files",
    allowedMimeTypes: audioMimeTypes, // allow all audio formats
  });
}

export async function PATCH(request) {
  return HandleEncryptedServicesUpdate({
    request,
    model: AudioServiceModel,
    serviceName: "audios",
  });
}

