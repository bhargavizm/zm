import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    urlServicesData:{},
    error: null
}

    
const urlServicesSlice = createSlice({
    name: 'urlServices',
    initialState,
    reducers: {
   setURLServices: (state, action) => {
            return {
                ...state,
                urlServicesData: action.payload,
                error: null
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setURLServices,
    clearError
}

    = urlServicesSlice.actions

export default urlServicesSlice.reducer