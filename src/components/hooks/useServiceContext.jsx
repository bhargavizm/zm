

import { useContext } from "react";
import { ServicesContext } from "@/context/servicesContext/ServicesContext";


const useServicesContext = () => useContext(ServicesContext);

export default useServicesContext;
