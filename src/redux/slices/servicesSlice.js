import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resumeServiceData:[],
    pdfServiceData:[],
    vehicleServiceData:[],
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
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setResumeServices,
    setPDFServices,
    setVehicleServices,
    clearError
}
    = servicesSlice.actions

export default servicesSlice.reducer