import { combineReducers } from "redux";
import user from "./users";
import auth from "./auth";
import orders from "./orders";

export default combineReducers({
	user,
	auth,
	orders,
});
