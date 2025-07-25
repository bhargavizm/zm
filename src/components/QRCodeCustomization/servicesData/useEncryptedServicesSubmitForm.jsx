// hooks/useSubmitEncryptedForm.js
"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { formDataMappers } from "./formDataMappers";
import { reduxDispatchMappers } from "./dispatchMappers";
import { getInitialFormData } from "./initialFormStates";
import useDesignContext from "@/components/hooks/useDesignContext";

const useEncryptedSubmitForm = (
  activeService,
  formDataState,
  setFormDataState,
  setTotalSize,
  setSizeWarning,
  setBgDesign
) => {
  const dispatch = useDispatch();
  const { setQrCodeUrl } = useDesignContext();

  const submit = async () => {
    const mapperObj = formDataMappers[activeService];

    if (!mapperObj || typeof mapperObj.map !== "function") {
      toast.error(`❌ No mapper found for "${activeService}"`);
      return;
    }

    const { type, map } = mapperObj;

    let dataToSend;
    let headers = {};

    if (type === "formData") {
      dataToSend = new FormData();
      map(dataToSend, formDataState, formDataState.bgDesign || "");
      headers["Content-Type"] = "multipart/form-data";
    } else if (type === "json") {
      dataToSend = map({}, formDataState, formDataState.bgDesign || "");
      headers["Content-Type"] = "application/json";
    }

    try {
      const res = await axios.post(`/api/encryptedServices/${activeService}`, dataToSend, {
        headers,
      });

      if (res.data.success) {
        toast.success(res.data.message || "✅ Encrypted service submitted");

        // ✅ Set global QR URL
        setQrCodeUrl(res.data.qrUrl);

        // ✅ Dispatch to Redux store
        const dispatchFn = reduxDispatchMappers[activeService];
        if (typeof dispatchFn === "function") {
          dispatch(dispatchFn(res?.data?.data));
        }

        // ✅ Reset states
        if (typeof setFormDataState === "function") {
          setFormDataState(getInitialFormData(activeService));
        }

        if (typeof setBgDesign === "function") {
          setBgDesign(null);
        }

        if (typeof setTotalSize === "function") {
          setTotalSize(0);
        }

        if (typeof setSizeWarning === "function") {
          setSizeWarning("");
        }

        return res.data.qrUrl;
      } else {
        toast.error(res.data.error || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.error("Error submitting encrypted form:", err.message);
      toast.error(err?.response?.data?.error || "Something went wrong!");
      return false;
    }
  };

  return submit;
};

export default useEncryptedSubmitForm;
