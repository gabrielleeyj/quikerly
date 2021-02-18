import {
	axiosGetWithCookies,
	axiosPostWithCookies,
	axiosPatchWithCookies,
} from "./helper";

export const getProfile = () => axiosGetWithCookies("/users/profile");
export const login = (data) =>
	axiosPostWithCookies(`/users/auth/web-login`, { data: data });
export const addNotificationToken = (data) =>
	axiosPostWithCookies("/notification/push-token", { data: data });
export const logout = () => axiosPostWithCookies(`/users/auth/logout`, {});
export const createPassword = (userId, token, pwd) =>
	axiosPatchWithCookies(`/users/create-password`, {
		data: { userId: userId, token: token, password: pwd },
	});
export const changePassword = (oldPwd, newPwd) =>
	axiosPatchWithCookies(`/users/password`, {
		data: { currentPassword: oldPwd, newPassword: newPwd },
	});
export const updateUserProfile = ({ data }) =>
	axiosPatchWithCookies(`/users/profile`, {
		data,
	});
