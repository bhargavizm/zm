import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resumeServiceData:[],
    pdfServiceData:[],
    textMessageData:[],
    smsServiceData:[],
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
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setResumeServices,
    setPDFServices,
    setTextMessageServices,
    setSmsServices,
    clearError
}
    = servicesSlice.actions

export default servicesSlice.reducer