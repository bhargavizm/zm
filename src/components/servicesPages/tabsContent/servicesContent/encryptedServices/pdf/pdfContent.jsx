
import { useDispatch } from "react-redux";
import useServicesContext from "@/components/hooks/useServiceContext";
import EncryptedServicesForm from "../common/encryptedServicesForm";
import { setPDFServices } from "@/redux/slices/encryptedServicesSlice";


const PDFContent = () => {
  const { pdfFormData, setPdfFormData } = useServicesContext();
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-xl">
      <EncryptedServicesForm
        formData={pdfFormData}
        setFormData={setPdfFormData}
          fileKey="file"
        apiRoute="/api/encryptedServices/pdf"
        reduxAction={setPDFServices}
        dispatch={dispatch}
        accept="/*"
        titleLabel="PDF Title"
        fileLabel="Upload PDF Files"
        successMessage="✅ PDFs uploaded successfully"
      />
    </div>
  );
};

export default PDFContent;

