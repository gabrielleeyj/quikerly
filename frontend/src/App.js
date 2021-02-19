import "./App.css";
import React, { useState } from "react";
import LandingPage from "./components/WelcomeView/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/WelcomeView/SignUp";
import SignIn from "./components/WelcomeView/SignIn";
import ForgotPassword from "./components/WelcomeView/ForgotPassword";
import Index from "./components/DashboardView/Index";
import fire from "./firebase/Config";
// import {
// 	FirebaseAuthProvider,
// 	FirebaseAuthConsumer,
// } from "@react-firebase/auth";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	fire.auth().onAuthStateChanged((user) => {
		return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
	});

	console.log("logged in?", isLoggedIn);

	return (
		<div className="App">
			<Router>
				{!isLoggedIn ? (
					<>
						<Switch>
							<Route exact path="/" component={LandingPage} />
							<Route path="/sign-up" component={SignUp} />
							<Route path="/sign-in" component={SignIn} />
							<Route path="/forgot-password" component={ForgotPassword} />
						</Switch>
					</>
				) : (
					<>
						<Route to="/dashboard" component={Index} />
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
