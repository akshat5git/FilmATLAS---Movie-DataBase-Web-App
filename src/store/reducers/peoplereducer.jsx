import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    info : null
};
const People = createSlice({
    name : "people",
    initialState,
    reducers : {
        peoplefetch : (state , action)=>{
        state.info = action.payload
        },
        peoplefetchreset : (state)=>{
            state.info = null
        }  
    }
});
export const {peoplefetch ,peoplefetchreset} = People.actions;
export default People.reducer
