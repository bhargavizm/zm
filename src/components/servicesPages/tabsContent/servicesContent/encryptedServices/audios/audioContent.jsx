import { useDispatch } from "react-redux";
import useServicesContext from "@/components/hooks/useServiceContext";
import EncryptedServicesForm from "../common/encryptedServicesForm";
import { setAudioServices } from "@/redux/slices/encryptedServicesSlice";

const AudioContent = () => {
  const { audioFormData, setAudioFormData } = useServicesContext();
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-xl">
      <EncryptedServicesForm
        formData={audioFormData}
        setFormData={setAudioFormData}
        apiRoute="/api/encryptedServices/audio"
        reduxAction={setAudioServices}
        dispatch={dispatch}
          fileKey="file"
        accept="audio/*"
        titleLabel="Audio Title"
        fileLabel="Upload Audio Files"

        renderPreview={(file) => (
          <audio
            controls
            className="w-full mt-1"
            src={URL.createObjectURL(file)}
          />
        )}
        successMessage="✅ Audio files uploaded successfully"
      />
    </div>
  );
};

export default AudioContent;

