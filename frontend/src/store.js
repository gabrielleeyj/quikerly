import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();
/* Create Store */
const middleware = [sagaMiddleware];
const composeEnhancers =
	process.env.NODE_ENV !== "production" &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				name: "MyApp",
				actionsBlacklist: ["REDUX_STORAGE_SAVE"],
		  })
		: compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancer);

export { store };
