import { combineReducers } from "redux";
import Room from "./Room";
import Team from "./Team";

const rootReducer = combineReducers({ Room, Team });

export default rootReducer;
