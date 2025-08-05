// hooks/useSubmitForm.js
"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { formDataMappers } from "./formDataMappers";
import { reduxDispatchMappers } from "./dispatchMappers";
import { getInitialFormData } from "./initialFormStates";
import useDesignContext from "@/components/hooks/useDesignContext";
import axiosInstance from "@/lib/axiosInstance";

const useSubmitForm = (activeService, formDataState, bgDesign, setFormDataState, setBgDesign) => {
  console.log('formDataState',formDataState);
  const dispatch = useDispatch();
const {setQrCodeUrl} =useDesignContext();

  const submit = async () => {
    const mapperObj = formDataMappers[activeService];

    if (!mapperObj || typeof mapperObj.map !== "function") {
      toast.error(`❌ No mapper found for "${activeService}"`);
      return;
    }
  console.log('mapperObj',mapperObj);
    const { type, map } = mapperObj;

    let dataToSend;
    let headers = {};

    if (type === "formData") {
      dataToSend = new FormData();
      map(dataToSend, formDataState, bgDesign);
      headers["Content-Type"] = "multipart/form-data";
    } else if (type === "json") {
      dataToSend = map({}, formDataState, bgDesign); // Returns JSON object
      headers["Content-Type"] = "application/json";
    }

console.log('dataToSend',dataToSend);
    try {
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services/${activeService}`,
        dataToSend,
        { headers,withCredentials: true }
      );



      if (res.data.success) {


  toast.success(res.data.message || "Submitted successfully");

  // ✅ Set QR URL in global context
  setQrCodeUrl(res.data.qrUrl);

  const dispatchFn = reduxDispatchMappers[activeService];
  if (typeof dispatchFn === "function") {
    dispatch(dispatchFn(res?.data?.data));
  }

  if (typeof setFormDataState === "function") {
    setFormDataState(getInitialFormData(activeService));
  }
  if (typeof setBgDesign === "function") {
    setBgDesign(null);
  }

  return res.data.qrUrl; // ✅ Return the qrUrl instead of true
}
 else {


        toast.error("Something went wrong");
        return false;
      }
    } catch (err) {
      console.error("Error submitting:", err.message);
      toast.error(err?.response?.data?.error);
      return false;
    }
  };

  return submit;
};

export default useSubmitForm;