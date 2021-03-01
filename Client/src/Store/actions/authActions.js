import date from 'date-and-time'

export const signIn = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const auth = firebase.auth();
		let current = new Date().toISOString();
		current = date.transform(current.slice(0, 10).replaceAll('-', '/'), 'YYYY/MM/DD', 'DD/MM/YYYY')
		const firestore = firebase.firestore()
		const googleProvider = new firebase.auth.GoogleAuthProvider()
		auth.signInWithPopup(googleProvider)
			.then((res) => {
				const uid = res.user.uid
				const loggedUser = {
					userEmail: res.user.email,
					userName: res.user.displayName,
					photo: res.user.photoURL,
					registrationDate: current,
					userType: 'user'
				}
				firestore.collection('users').doc(res.user.uid).get()
					.then((res) => {
						if (!res.data()) {
							auth.sendPasswordResetEmail(loggedUser.userEmail)
							firestore.collection('users').doc(uid).set(loggedUser)
								.then(res => {
									dispatch({ type: 'GOOGLE_LOGIN_SUCCESS', data: loggedUser });
								})
						}
						else {
							dispatch({ type: 'GOOGLE_LOGIN_SUCCESS', data: res.data() });
						}
					})

			})
			.catch((err) => {
				dispatch({ type: 'GOOGLE_LOGIN_ERROR', err });
			})
	}
}

export const signInEmailPassword = (creds) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
			.then((res) => {
				firebase.firestore().collection('users').doc(res.user.uid).get()
					.then(res => dispatch({ type: 'SIGN_IN_SUCCESS', data: res.data() }))
					.catch(err => dispatch({ type: 'SIGN_IN_ERROR', err }))
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase.auth().signOut()
			.then(() => {
				dispatch({ type: 'SIGNOUT_SUCCESS' })
			})
			.catch(() => {
				dispatch({ type: 'SIGNOUT_ERROR' })
			})
	}
}
export const signUp = (newUser) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		let current = new Date().toISOString();
		current = date.transform(current.slice(0, 10).replaceAll('-', '/'), 'YYYY/MM/DD', 'DD/MM/YYYY')
		firebase.auth().createUserWithEmailAndPassword(
			newUser.userEmail,
			newUser.userPassword
		).then(res => {
			return firestore.collection('users').doc(res.user.uid).set({
				userName: newUser.userName,
				userContact: newUser.userContact,
				userAddress: newUser.userAddress,
				userPostalCode: newUser.userPostalCode,
				userEmail: newUser.userEmail,
				registrationDate: current,
				userType: newUser.userType,
				photo: null
			})
				.then((res) => {
					dispatch({ type: 'SIGNUP_SUCCESS', data: newUser });
				}).catch((err) => {
					dispatch({ type: 'SIGNUP_ERROR', err });
				});
		})
	}
}

export const updateProfile = (updatedData) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const uid = getState().firebase.auth.uid
		firebase.firestore().collection("users").doc(uid).update(updatedData)
			.then((res) => {
				dispatch({ type: 'UPDATE_PROFILE_SUCCESS', data: updatedData })
			})
			.catch((err) => {
				dispatch({ type: 'UPDATE_PROFILE_ERROR' })
			})
	}
}

