
import useServicesContext from "@/components/hooks/useServiceContext";
import { useDispatch } from "react-redux";
import EncryptedServicesForm from "../common/encryptedServicesForm";
import { setVideoServices } from "@/redux/slices/encryptedServicesSlice";

const VideoContent = () => {
  const { videoFormData, setVideoFormData } = useServicesContext();
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-xl">
      <EncryptedServicesForm
        formData={videoFormData}
        setFormData={setVideoFormData}
        apiRoute="/api/encryptedServices/video"
        reduxAction={setVideoServices}
        dispatch={dispatch}
          fileKey="file"
        accept="video/*" // Accepts any video format
        titleLabel="Video Title"
        fileLabel="Upload Video Files"
        successMessage="✅ Video files uploaded successfully"
        renderPreview={(file) => (
          <video
            controls
            className="w-full mt-2 rounded-md"
            src={URL.createObjectURL(file)}
          />
        )}
      />
    </div>
  );
};

export default VideoContent;


