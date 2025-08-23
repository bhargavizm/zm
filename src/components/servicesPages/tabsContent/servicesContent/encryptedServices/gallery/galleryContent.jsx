import { useDispatch } from "react-redux";
import useServicesContext from "@/components/hooks/useServiceContext";
import EncryptedServicesForm from "../common/encryptedServicesForm";
import { setGalleryServices } from "@/redux/slices/encryptedServicesSlice";


const GalleryContent = () => {
  const { imagesFormData, setImagesFormData } = useServicesContext();
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-xl">
      <EncryptedServicesForm
        formData={imagesFormData}
        setFormData={setImagesFormData}
        apiRoute="/api/encryptedServices/gallery"
        reduxAction={setGalleryServices}
        dispatch={dispatch}
        accept="image/*"
         fileKey="file" 
        titleLabel="Gallery Title"
        fileLabel="Upload Images"
        successMessage="✅ Images uploaded successfully"
        renderPreview={(file) => (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-full mt-2 rounded-md"
          />
        )}
      />
    </div>
  );
};

export default GalleryContent;


