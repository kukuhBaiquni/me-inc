import { combineReducers } from "redux";
import data from "./data";
import products from "./products";
import zone from "./zone";

const rootReducer = combineReducers({
    data,
    products,
    zone
});

export default rootReducer;