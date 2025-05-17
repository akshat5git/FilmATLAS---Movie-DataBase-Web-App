import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/moviereducer";
import tvReducer from "./reducers/tvreducer";
import peopleReducer from "./reducers/peoplereducer";
const store = configureStore({
    reducer : {
    movie : movieReducer,
    tv : tvReducer,
    people : peopleReducer
    }
});
export default store;