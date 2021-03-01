const initState = {};
const customerReducer = (state = initState, action) => {
	switch (action.type) {
		case "GET_CUSTOMERS_SUCCESS":
			return {
				...state,
				customers: action.customers,
			};
		case "GET_CUSTOMERS_ERROR":
			return {
				...state,
				err: action.err,
			};
		default:
			return {
				...state,
			};
	}
};

export default customerReducer;
