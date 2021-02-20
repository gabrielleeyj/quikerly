import React, { useState } from "react";
import { connect } from "react-redux";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "./components/Typography";
import AppAppBar from "./views/AppAppBar";
import AppForm from "./views/AppForm";
import { email, required } from "./form/validation";
import RFTextField from "./form/RFTextField";
import FormButton from "./form/FormButton";
import FormFeedback from "./form/FormFeedback";
// import FormControl from "@material-ui/core/FormControl";
// import IconButton from "@material-ui/core/IconButton";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
import fire from "../../firebase/Config";
import { authenticated, hasAuthenticated } from "../../reducers/auth";

const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: theme.spacing(6),
		// background: theme.palette.primary.light,
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
	feedback: {
		marginTop: theme.spacing(2),
	},
}));

function SignIn() {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (values) => {
		if (values) {
			fire
				.auth()
				.signInWithEmailAndPassword(values.email, values.password)
				.catch((error) => {
					console.error("Incorrect username or password");
				});
			return authenticated(true);
		}
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const classes = useStyles();

	const validate = (values) => {
		const errors = required(["email", "password"], values);

		if (!errors.email) {
			const emailError = email(values.email, values);
			if (emailError) {
				errors.email = email(values.email, values);
			}
		}

		return errors;
	};

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
						<Link href="/sign-up" align="center" underline="always">
							Sign Up here
						</Link>
					</Typography>
				</React.Fragment>
				<Form
					onSubmit={handleSubmit}
					subscription={{ submitting: true }}
					validate={validate}
				>
					{({ handleSubmit, submitting, sent }) => (
						<form onSubmit={handleSubmit} className={classes.form} noValidate>
							<Field
								autoComplete="email"
								autoFocus
								component={RFTextField}
								onInputChange={handleChange("email")}
								disabled={submitting || sent}
								fullWidth
								label="Email"
								margin="normal"
								name="email"
								required
								size="large"
							/>
							<Field
								fullWidth
								size="large"
								component={RFTextField}
								disabled={submitting || sent}
								required
								onInputChange={handleChange("password")}
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
								disabled={submitting || sent}
								size="large"
								color="secondary"
								fullWidth
							>
								{submitting || sent ? "In progress…" : "Sign In"}
							</FormButton>
							<Typography align="center">or</Typography>
							<FormButton
								className={classes.button}
								disabled={submitting || sent}
								size="large"
								color="primary"
								fullWidth
							>
								{submitting || sent ? "In progress…" : "Sign in with Google"}
							</FormButton>
						</form>
					)}
				</Form>
				<Typography align="center">
					Don't have an account?{" "}
					<Link underline="always" href="/sign-up">
						Sign up here
					</Link>
				</Typography>
				<Typography align="center">
					<Link underline="always" href="/forgot-password">
						Forgot password?
					</Link>
				</Typography>
			</AppForm>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => ({
	authenticated: hasAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
	authenticated: (status) => dispatch(hasAuthenticated(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
