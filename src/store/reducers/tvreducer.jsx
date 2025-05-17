import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    info : null
};
const tvSlice = createSlice({
    name : "tv",
    initialState,
    reducers : {
        tvfetch : (state , action)=>{
        state.info = action.payload
        },
        tvfetchreset : (state)=>{
            state.info = null
        }  
    }
});
export const {tvfetch ,tvfetchreset} = tvSlice.actions;
export default tvSlice.reducer
