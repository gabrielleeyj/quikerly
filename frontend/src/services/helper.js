import axios from "axios";
import config from "../config";
const serviceUrl = config.api;

export const axiosGetWithCookies = (api) =>
	axios.get(`${serviceUrl}${api}`, {
		withCredentials: true,
	});

export const axiosPostWithCookies = (api, data) =>
	axios.post(`${serviceUrl}${api}`, data, { withCredentials: true });

export const axiosPutWithCookies = (api, data) =>
	axios.put(`${serviceUrl}${api}`, data, { withCredentials: true });

export const axiosPatchWithCookies = (api, data) =>
	axios.patch(`${serviceUrl}${api}`, data, { withCredentials: true });
