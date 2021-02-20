import React, { useState } from "react";
import { connect } from "react-redux";
import fire from "./firebase/Config";
import { hasAuthenticated } from "./reducers/auth";
import Routes from "./router";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	fire.auth().onAuthStateChanged((user) => {
		if (!user) {
			console.log("not logged in", user);
		}
		hasAuthenticated({ status: true }) && setIsLoggedIn(true);
	});

	return isLoggedIn && <Routes />;
}

const mapStateToProps = (state) => ({
	authenticated: hasAuthenticated(state),
});

export default connect(mapStateToProps)(App);
