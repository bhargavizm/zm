import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resumeServiceData:[],
    pdfServiceData:[],
    menuCardServiceData:[],
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
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setResumeServices,
    setPDFServices,
    setMenuCardServices,
    clearError
}
    = servicesSlice.actions

export default servicesSlice.reducer