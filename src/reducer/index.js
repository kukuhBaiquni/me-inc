import { combineReducers } from "redux";
import data from "./data";
import products from "./products";
import zone from "./zone";
import customers from "./customers";

const rootReducer = combineReducers({
    data,
    products,
    zone,
    customers
});

export default rootReducer;