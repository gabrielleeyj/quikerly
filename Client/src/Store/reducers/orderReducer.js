const initState = {};

const orderReducer = (state = initState, action) => {
	switch (action.type) {
		case "ORDER_CREATE_ERROR":
			return {
				...state,
			};
		case "ORDER_CREATE_SUCCESS":
			return {
				...state,
				orders: action.orders,
			};
		case "GET_ORDERS_SUCCESS":
			return {
				...state,
				orders: action.orders,
			};
		case "GET_ORDERS_ERROR":
			return {
				...state,
			};
		case "UPDATE_ORDER_SUCCESS":
			return {
				...state,
				orders: action.orders,
			};
		case "UPDATE_ORDER_ERROR":
			return {
				...state,
			};
		case "CLEAN_ORDERS":
			return {
				...state,
				orders: [],
			};
		default:
			return state;
	}
};

export default orderReducer;
