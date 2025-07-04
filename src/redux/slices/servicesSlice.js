import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resumeServiceData:[],
    pdfServiceData:[],
    vehicleServiceData:[],
    wifiServiceData:[],
    error: null
}

    
const servicesSlice = createSlice({
    name: 'Services',
    initialState,
    reducers: {
        setResumeServices: (state, action) => {
            return {
                ...state,
                resumeServiceData: action.payload,
                error: null
            }
        },
        setPDFServices: (state, action) => {
            return {
                ...state,
                pdfServiceData: action.payload,
                error: null
            }
        },
        setVehicleServices:(state,action)=>{
            return{
                ...state,
                vehicleServiceData:action.payload,
                error:null
            }
        },
        setWifiServices: (state, action) => {
            return {
                ...state,
                wifiServiceData: action.payload,
                error: null
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setResumeServices,
    setPDFServices,
    setVehicleServices,
    setWifiServices,
    clearError
}
    = servicesSlice.actions

export default servicesSlice.reducer