import {
	axiosGetWithCookies,
	axiosPostWithCookies,
	axiosPutWithCookies,
	axiosPatchWithCookies,
} from "./helper";

export const fetchUserList = ({ userId, archived = false, search, from }) => {
	let query = `/users/`;
	if (from) query += `&from=${from}`;
	if (userId) query += `&userId=${userId}`;
	if (archived) query += `&includeArchived=${archived}`;
	if (search && search.length > 2) query += `&search=${search}`;

	return axiosGetWithCookies(query);
};

export const fetchUserDetail = (id) => axiosGetWithCookies(`/users/${id}`);

export const addUser = (user) =>
	axiosPostWithCookies(`/users/`, {
		data: user,
	});

export const updateUser = (id, user) =>
	axiosPutWithCookies(`/users/${id}`, {
		data: user,
	});

export const updatePasscode = (id, passcode) =>
	axiosPatchWithCookies(`/users/${id}/passcode`, {
		data: passcode,
	});
