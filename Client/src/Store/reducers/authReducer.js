const initState = {
	authError: null,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "GOOGLE_LOGIN_ERROR":
			return {
				...state,
				authError: "Login failed",
			};
		case "GOOGLE_LOGIN_SUCCESS":
			return {
				...state,
				authError: null,
				userData: action.data,
			};
		case "SIGN_IN_SUCCESS":
			return {
				...state,
				authError: null,
				userData: action.data,
			};
		case "SIGN_IN_ERROR":
			return {
				...state,
				authError: "login error",
			};
		case "SIGNOUT_SUCCESS":
			return {
				...state,
			};
		case "SIGNUP_SUCCESS":
			return {
				...state,
				authError: null,
				userData: action.data,
			};
		case "SIGNUP_ERROR":
			return {
				...state,
				authError: action.err.message,
			};
		case "UPDATE_PROFILE_SUCCESS":
			return {
				...state,
				userData: action.data,
			};
		default:
			return state;
	}
};

export default authReducer;
