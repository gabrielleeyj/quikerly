import withRoot from "./withRoot";
import React, { useState } from "react";
import { Form, FormSpy } from "react-final-form";
import { makeStyles, TextField } from "@material-ui/core";
import Typography from "./components/Typography";
import AppAppBar from "./views/AppAppBar";
import AppForm from "./views/AppForm";

import FormButton from "./form/FormButton";
import FormFeedback from "./form/FormFeedback";

import { Link } from 'react-router-dom'
import { signIn, signInEmailPassword } from '../../Store/actions/authActions'
import { connect } from "react-redux";
import firebase from '../../Firebase/Config'

const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: theme.spacing(6),
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
	feedback: {
		marginTop: theme.spacing(2),
	},
}));

function SignIn(props) {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const handleSubmit = () => {
		props.googleSignIn()
		firebase.auth().onAuthStateChanged((user) => {
			props.history.push('/dashboard')
		})
	};

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};
	const classes = useStyles();
	const login = (e) => {
		e.preventDefault()
		if (values.email.length > 1 && values.password.length > 1) {
			props.signInEmailPassword(values)
		}
		else {
			alert('Invalid Credentials')
		}
	}
	return (
		<React.Fragment>
			<AppAppBar />
			<AppForm>
				<React.Fragment>
					<Typography variant="h3" gutterBottom marked="center" align="center">
						Sign In
					</Typography>
					<Typography variant="body2" align="center">
						{"Not a member yet? "}
						<Link to="/sign-up" style={{ textDecoration: 'underline' }}>
							Sign Up here
						</Link>
					</Typography>
				</React.Fragment>
				<Form
					onSubmit={(e) => login(e)}
					subscription={{ submitting: true }}
				>
					{({ submitting, sent }) => (
						<form onSubmit={(e) => login(e)} className={classes.form} noValidate>
							<TextField
								autoComplete="email"
								onChange={(e) => handleChange(e)}
								fullWidth
								label="Email"
								margin="normal"
								name="email"
							/>
							<TextField
								fullWidth
								onChange={(e) => handleChange(e)}
								name="password"
								autoComplete="current-password"
								label="Password"
								type="password"
								margin="normal"
							/>
							<FormSpy subscription={{ submitError: true }}>
								{({ submitError }) =>
									submitError ? (
										<FormFeedback className={classes.feedback} error>
											{submitError}
										</FormFeedback>
									) : null
								}
							</FormSpy>
							<FormButton
								className={classes.button}
								size="large"
								color="secondary"
								fullWidth
							>
								{submitting || sent ? "In progress…" : "Sign In"}
							</FormButton>
							<Typography align="center">or</Typography>
						</form>
					)}
				</Form>

				<FormButton
					className={classes.button}
					size="large"
					color="primary"
					fullWidth
					onClick={handleSubmit}
				>
					Sign In With Google
				</FormButton>
				<Typography align="center">
					Don't have an account?{" "}
					<Link style={{ textDecoration: 'underline' }} to="/sign-up">
						Sign up here
					</Link>
				</Typography>
				<Typography align="center">
					<Link style={{ textDecoration: 'underline' }} to='/forgot-password'>
						Forgot password?
					</Link>
				</Typography>
			</AppForm>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		googleSignIn: () => dispatch(signIn()),
		signInEmailPassword: (creds) => dispatch(signInEmailPassword(creds))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(SignIn))
