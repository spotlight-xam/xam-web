import { legacy_createStore } from "redux";
import rootReducer from "./rootReducer";

const store = legacy_createStore(rootReducer);
const reducer = () => {};

export default store;
