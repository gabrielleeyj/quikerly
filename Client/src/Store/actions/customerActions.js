export const getCustomers = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const userType = getState().auth.userData.userType;
		firebase
			.firestore()
			.collection("users")
			.get()
			.then((res) => {
				const customers = res.docs.map((doc) => doc.data());
				dispatch({ type: "GET_CUSTOMERS_SUCCESS", customers, userType });
			})
			.catch((err) => dispatch({ type: "GET_CUSTOMERS_ERROR", err }));
	};
};
