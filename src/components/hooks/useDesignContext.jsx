

import { useContext } from "react";
import { DesignContext } from "@/context/qrCodeDesignContext/DesignContext";


const useDesignContext = () => useContext(DesignContext);

export default useDesignContext;
