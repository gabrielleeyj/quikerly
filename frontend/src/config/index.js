/* global CONFIG */
// CONFIG may or may not be available. It's a JSON serialised value of the helm
// charts' {{ .Values.config.env }} and it's injected through a ConfigMap
// and loaded in index.html

const defaults = {
	BACKEND_GATEWAY: "http://localhost:5000",
	GOOGLE_API_KEY: process.env.GOOGLE_API_KEY, //development purpose
};

const INJECTED = typeof CONFIG === "undefined" ? {} : CONFIG;

const mergeConfig = {
	...defaults,
	...INJECTED,
};

const Config = {
	googleApiKey: mergeConfig.GOOGLE_API_KEY,
	api: mergeConfig.BACKEND_GATEWAY,
};

export default Config;
