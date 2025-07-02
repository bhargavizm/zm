import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resumeService:[],
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


        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    setResumeServices,
    clearError
}

    = servicesSlice.actions

export default servicesSlice.reducer