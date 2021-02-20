import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import GlobalStyles from "../theme/GlobalStyles";
import theme from "../theme";
import { authenticated } from "../reducers/auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../components/WelcomeView/LandingPage";
import SignUp from "../components/WelcomeView/SignUp";
import SignIn from "../components/WelcomeView/SignIn";
import ForgotPassword from "../components/WelcomeView/ForgotPassword";
import Index from "../components/DashboardView/Index";

const App = () => {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				{!authenticated ? (
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
			</ThemeProvider>
		</Router>
	);
};
export default App;
