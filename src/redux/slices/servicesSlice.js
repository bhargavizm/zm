import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resumeServiceData:[],
    pdfServiceData:[],
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


        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setResumeServices,
    setPDFServices,
    clearError
}
    = servicesSlice.actions

export default servicesSlice.reducer