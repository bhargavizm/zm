import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resumeServiceData:[],

    menuCardServiceData:[],

    pdfServiceData:[],
    textMessageData:[],
    smsServiceData:[],
    medicalServiceData:[],
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

        setMenuCardServices: (state, action) => {
            return {
                ...state,
                menuCardServiceData: action.payload,
                error: null
            }
        },


        setTextMessageServices: (state, action) => {
            return {
                ...state,
                textMessageData: action.payload,
                error: null
            }
        },
        setSmsServices: (state, action) => {
            return{
                ...state,
                smsServiceData: action.payload,
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
        setmedicalServices:(state,action)=>{
            return{
                ...state,
                medicalServiceData:action.payload,
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

    setMenuCardServices,


    setTextMessageServices,
    setSmsServices,

    setVehicleServices,
    setmedicalServices,

    clearError
}
    = servicesSlice.actions

export default servicesSlice.reducer