// Actions
export const GET_PROFILE = "GET_PROFILE";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATED = "AUTHENTICATED";
export const ADD_NOTIFICATION_TOKEN = "ADD_NOTIFICATION_TOKEN";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

const initialState = {
	authenticated: undefined,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case AUTHENTICATED:
			return { ...state, authenticated: action.status };
		// do reducer stuff
		default:
			return state;
	}
}

// Action Creators
export function getProfile() {
	return { type: GET_PROFILE };
}

export function logoutUser(history) {
	return { type: LOGOUT, history };
}

export function loginUser(user, history) {
	return { type: LOGIN, user, history };
}

export function authenticated(status) {
	return { type: AUTHENTICATED, status };
}

export function addNotificationToken(regionId, token) {
	return { type: ADD_NOTIFICATION_TOKEN, regionId, token };
}

export function updateUserProfile(data) {
	return { type: UPDATE_USER_PROFILE, data };
}

export const hasAuthenticated = (state) => state.auth.authenticated;
