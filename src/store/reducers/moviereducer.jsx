import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    info : null
};
const movieSlice = createSlice({
    name : "movie",
    initialState,
    reducers : {
        moviefetch : (state , action)=>{
        state.info = action.payload
        },
        moviefetchreset : (state , action)=>{
            state.info = null
        }  
    }
});
export const {moviefetch ,moviefetchreset } = movieSlice.actions;
export default movieSlice.reducer
