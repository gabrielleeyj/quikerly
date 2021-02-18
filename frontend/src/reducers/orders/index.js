//ACTION

export const FETCH_ORDERS_LIST = "FETCH_ORDERS_LIST";
export const SET_ORDERS_LIST = "SET_ORDERS_LIST";

export const FETCH_ORDERS_DETAILS = "FETCH_ORDERS_DETAILS";
export const SET_ORDERS_DETAILS = "SET_ORDERS_DETAILS";

export const CREATE_ORDERS = "CREATE_ORDERS";
export const UPDATE_ORDERS = "UPDATE_ORDERS";

export const SET_ORDERS_FILTERS = "SET_ORDERS_FILTERS";
export const SET_REFRESH_ORDERS = "SET_REFRESH_ORDERS";

const initialState = {
	details: {},
	list: [],
	filters: {
		archived: false,
	},
	totalEntries: 0,
	forceRefresh: false,
};

//REDUCER

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_ORDERS_DETAILS:
			return { ...state, details: action.orders };
		case SET_ORDERS_LIST:
			return { ...state, list: action.list, totalEntries: action.totalEntries };
		case SET_ORDERS_FILTERS:
			return { ...state, filters: action.filters };
		case SET_REFRESH_ORDERS:
			return { ...state, forceRefresh: action.value };
		default:
			return state;
	}
}

//ACTION CREATOR
export function fetchOrdersDetails(id) {
	return { type: FETCH_ORDERS_DETAILS, id };
}

export function setOrdersDetails(orders) {
	return { type: SET_ORDERS_DETAILS, orders };
}

export function fetchOrdersList({ filters = initialState.filters, from }) {
	return { type: FETCH_ORDERS_LIST, filters, from };
}

export function setOrdersList({ list, totalEntries }) {
	return { type: SET_ORDERS_LIST, list, totalEntries };
}

export function createOrders(orders, toggle = true) {
	return { type: CREATE_ORDERS, orders, toggle };
}

export function updateOrders(id, orders) {
	return { type: UPDATE_ORDERS, id, orders };
}

export function setOrdersFilters(filters = initialState.filters) {
	return { type: SET_ORDERS_FILTERS, filters };
}

export function setRefreshOrders(value) {
	return { type: SET_REFRESH_ORDERS, value };
}

export const getOrdersList = (state) => state.orders.list;
export const getOrdersFilterValues = (state) => state.orders.filters;
export const getForceRefresh = (state) => state.orders.forceRefresh;
export const getOrdersTotal = (state) => state.orders.totalEntries;
