import { combineReducers } from "redux";
import data from "./data";
import products from "./products";

const rootReducer = combineReducers({
    data,
    products
});

export default rootReducer;