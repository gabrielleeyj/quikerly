import axios from "axios";
import config from "../config";

import {
	getProfile,
	login,
	logout,
	addNotificationToken,
	createPassword,
	changePassword,
	updateUserProfile,
} from "./auth";
import {
	fetchUserList,
	fetchUserDetail,
	addUser,
	updateUser,
	updatePasscode,
} from "./users";
const serviceUrl = config.api;

const API = {
	// public apis
	verifyToken: (userId, token) =>
		axios.get(`${serviceUrl}/users/valid-token?u=${userId}&t=${token}`),
	resetPassword: (user) =>
		axios.patch(`${serviceUrl}/users/reset-password`, { data: user }),
	recoverPassword: (user) =>
		axios.post(`${serviceUrl}/users/forgot-password`, { data: user }),
	emailVerify: (userId, token) =>
		axios.patch(`${serviceUrl}/users/verify-email`, {
			data: { token: token, userId: userId },
		}),
	// auth related apis
	getProfile,
	updateUserProfile,
	login,
	logout,
	addNotificationToken,
	createPassword,
	changePassword,
	// user related apis
	fetchUserList,
	fetchUserDetail,
	addUser,
	updateUser,
	updatePasscode,
};

export default API;
