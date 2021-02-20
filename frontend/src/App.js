import React, { useState } from "react";
import { connect } from "react-redux";
import fire from "./firebase/Config";
import { authenticated, hasAuthenticated } from "./reducers/auth";
import Routes from "./router";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	fire.auth().onAuthStateChanged((user) => {
		if (!user) {
			console.log("not logged in", user);
		}
		setIsLoggedIn(true);
	});

	return isLoggedIn && <Routes authenticated={authenticated} />;
}

const mapStateToProps = (state) => ({
	authenticated: hasAuthenticated(state),
});

export default connect(mapStateToProps)(App);
