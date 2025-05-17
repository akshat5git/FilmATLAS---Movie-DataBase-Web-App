import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    info : null
};
const Search = createSlice({
    name : "Search",
    initialState,
    reducers : {
        SearchPut : (state , action)=>{
        state.info = action.payload
        },
        Searchfetchreset : (state)=>{
            state.info = null
        }  
    }
});
export const {Searchfetch ,Searchfetchreset} = Search.actions;
export default Search.reducer
