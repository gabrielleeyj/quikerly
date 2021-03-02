import date from 'date-and-time'
import { fire, auth } from '../../Firebase/Config'

const checkForAdmin = () => {
	fire.collection('users').get()
		.then(res => {
			const users = res.docs.map(doc => doc.data())
			let uid;
			users.map(user => {
				if (user.userType === 'admin') uid = user.userEmail
				return user
			})
			if (!uid) {
				auth.createUserWithEmailAndPassword(
					'admin@admin.com',
					'admin123'
				).then(res => {
					setTimeout(() => {
						let current = new Date().toISOString();
						current = date.transform(current.slice(0, 10).replaceAll('-', '/'), 'YYYY/MM/DD', 'DD/MM/YYYY')
						fire.collection('users').doc(res.user.uid).set({
							userName: 'Admin',
							userContact: 'xxxxxxxxxxx',
							userAddress: 'xxxxxxxxxxx',
							userPostalCode: 'xxxxxxxxxxx',
							userEmail: 'admin@admin.com',
							registrationDate: current,
							userType: 'admin',
							photo: ' '
						})
					}, 500)
				})
				setTimeout(() => {
					auth.signOut()
				}, 2000)
			}
		})
		.catch(err => console.log(err))
}

checkForAdmin()
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
					userContact: null,
					userAddress: null,
					userPostalCode: null,
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
				alert(err.message)
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
			console.log(res)
			return firestore.collection('users').doc(res.user.uid).set({
				userName: newUser.userName,
				userContact: newUser.userContact,
				userAddress: newUser.userAddress,
				userPostalCode: newUser.userPostalCode,
				userEmail: newUser.userEmail,
				registrationDate: current,
				userType: newUser.userType,
				photo: '  '
			})
				.then((res) => {
					dispatch({ type: 'SIGNUP_SUCCESS', data: newUser });
				}).catch((err) => {
					console.log(err)
					dispatch({ type: 'SIGNUP_ERROR', err });
				});
		})
			.catch(err => {
				alert(err.message)
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

export const getProfile=()=>{
	return (dispatch,getState,{getFirebase})=>{
		const firebase=getFirebase();
		const uid=getState().firebase.auth.uid;
		if(uid){
			firebase.firestore().collection('users').doc(uid).get()
			.then(res=>{
				dispatch({type:'GET_PROFILE_SUCCESS', data:res.data() })
			})
			.catch(err=>{
				dispatch({type:'GET_PROFILE_ERROR' })
			})
		}
	}
}
