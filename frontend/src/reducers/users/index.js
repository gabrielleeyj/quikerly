import get from "lodash/get";

// Actions
export const SET_USER = "SET_USER";

// Reducer
export default function reducer(state = {}, action = {}) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				...action.user,
			};
		// do reducer stuff
		default:
			return state;
	}
}

// Action Creators
export function setUserInfo(user) {
	return { type: SET_USER, user };
}

// Selectors
export const getGeneralInfo = (state) => get(state, "user.general", {});
export const getUserId = (state) => get(state, "user.general.userId");
export const getCompanyName = (state) => get(state, "user.general.companyName");
export const getUserRoles = (state) => get(state, "user.general.roles");
