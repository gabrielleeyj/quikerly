// Actions
export const GET_PROFILE = "GET_PROFILE";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATED = "AUTHENTICATED";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

const initialState = {
	authenticated: false,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case AUTHENTICATED:
			return { ...state, authenticated: action.status };
		// do reducer stuff
		case LOGOUT:
			return { ...state, authenticated: action.status };
		default:
			return state;
	}
}

// Action Creators
export function getProfile() {
	return { type: GET_PROFILE };
}

export function logoutUser(status) {
	return { type: LOGOUT, status };
}

export function loginUser(status) {
	return { type: LOGIN, status };
}

export function authenticated(status) {
	return { type: AUTHENTICATED, status };
}

export function updateUserProfile(data) {
	return { type: UPDATE_USER_PROFILE, data };
}

export const hasAuthenticated = (state) => state.auth.authenticated;
