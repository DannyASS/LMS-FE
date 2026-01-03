import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name : "global",
    initialState: {
        user : null,
    },
    reducers : {
        setUserStorage : (state, action) => {
            state.user = action.payload
        },
    }

    
})

export const { setUserStorage} = globalSlice.actions;
export default globalSlice.reducer;