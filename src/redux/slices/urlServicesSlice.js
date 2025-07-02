import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    urlServicesData:{},
    error: null
}

    
const urlServicesSlice = createSlice({
    name: 'urlServices',
    initialState,
    reducers: {
        setEmployeeFullDetails: (state, action) => {
            return {
                ...state,
                employeeFullDetails: action.payload,
                error: null
            }
        },


        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setEmployeeFullDetails,
    clearError
}

    = urlServicesSlice.actions

export default urlServicesSlice.reducer