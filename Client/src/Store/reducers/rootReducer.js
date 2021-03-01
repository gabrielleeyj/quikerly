import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import customerReducer from "./customerReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	order: orderReducer,
	customer: customerReducer,
	firebase: firebaseReducer,
});

export default rootReducer;
