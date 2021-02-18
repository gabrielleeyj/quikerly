import {
	axiosGetWithCookies,
	axiosPostWithCookies,
	axiosPatchWithCookies,
} from "./helper";

export const fetchOrdersList = ({ archived, userId, search }) => {
	let query = `/orders/`;
	if (userId) query += `&userId=${userId}`;
	if (search && search.length > 2) query += `&search=${search}`;
	if (archived) query += `&includeArchived=${archived}`;

	return axiosGetWithCookies(query);
};

export const fetchOrdersDetails = (id) => axiosGetWithCookies(`/orders/${id}`);

export const addOrders = (Orders) =>
	axiosPostWithCookies(`/orders`, {
		data: Orders,
	});

export const updateOrders = (id, Orders) =>
	axiosPatchWithCookies(`/orders/${id}`, {
		data: Orders,
	});
