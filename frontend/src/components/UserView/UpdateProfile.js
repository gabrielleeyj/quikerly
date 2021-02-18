import withRoot from "./withRoot";
// --- Post bootstrap -----
<<<<<<< HEAD:frontend/src/components/WelcomeView/SignUp.js
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./components/Typography";
import AppAppBar from "./views/AppAppBar";
import AppForm from "./views/AppForm";
import { email, required } from "./form/validation";
import RFTextField from "./form/RFTextField";
import FormButton from "./form/FormButton";
import FormFeedback from "./form/FormFeedback";
=======
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './components/Typography';
import AppForm from './views/AppForm';
import { email, required } from './form/validation';
import RFTextField from './form/RFTextField';
import FormButton from './form/FormButton';
import FormFeedback from './form/FormFeedback';
>>>>>>> cab0c04f3e1cca0e6dd279f0f2b1c538054cfab3:frontend/src/components/UserView/UpdateProfile.js

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

<<<<<<< HEAD:frontend/src/components/WelcomeView/SignUp.js
function SignUp() {
	const classes = useStyles();
	const [sent, setSent] = React.useState(false);
=======
function UpdateProfile() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
>>>>>>> cab0c04f3e1cca0e6dd279f0f2b1c538054cfab3:frontend/src/components/UserView/UpdateProfile.js

	const validate = (values) => {
		const errors = required(
			["firstName", "lastName", "email", "password"],
			values
		);

		if (!errors.email) {
			const emailError = email(values.email, values);
			if (emailError) {
				errors.email = email(values.email, values);
			}
		}

		return errors;
	};

	const handleSubmit = () => {};

<<<<<<< HEAD:frontend/src/components/WelcomeView/SignUp.js
	return (
		<React.Fragment>
			<AppAppBar />
			<AppForm>
				<React.Fragment>
					<Typography variant="h3" gutterBottom marked="center" align="center">
						Sign Up
					</Typography>
					<Typography variant="body2" align="center">
						<Link href="/sign-in" underline="always">
							Already have an account?
						</Link>
					</Typography>
				</React.Fragment>
				<Form
					onSubmit={handleSubmit}
					subscription={{ submitting: true }}
					validate={validate}
				>
					{({ handleSubmit, submitting }) => (
						<form onSubmit={handleSubmit} className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Field
										autoFocus
										component={RFTextField}
										autoComplete="fname"
										fullWidth
										label="First name"
										name="firstName"
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										component={RFTextField}
										autoComplete="lname"
										fullWidth
										label="Last name"
										name="lastName"
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										component={RFTextField}
										fullWidth
										label="Name Of Company"
										name="company"
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										component={RFTextField}
										fullWidth
										label="Contact Number"
										name="contact"
										required
									/>
								</Grid>
							</Grid>
							<Field
								autoComplete="email"
								component={RFTextField}
								disabled={submitting || sent}
								fullWidth
								label="Email"
								margin="normal"
								name="email"
								required
							/>
							<Field
								autoComplete="address"
								component={RFTextField}
								disabled={submitting || sent}
								fullWidth
								label="Pick Up Address"
								margin="normal"
								name="address"
								required
							/>
							<Field
								fullWidth
								component={RFTextField}
								disabled={submitting || sent}
								required
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
								color="secondary"
								fullWidth
							>
								{submitting || sent ? "In progress…" : "Sign Up"}
							</FormButton>
							<Typography align="center">or</Typography>
							<FormButton
								className={classes.button}
								disabled={submitting || sent}
								size="large"
								color="primary light"
								fullWidth
							>
								{submitting || sent ? "In progress…" : "Sign in with Google"}
							</FormButton>
						</form>
					)}
				</Form>
			</AppForm>
		</React.Fragment>
	);
}

export default withRoot(SignUp);
=======
  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Update Profile
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
          {({ handleSubmit2, submitting }) => (
            <form onSubmit={handleSubmit2} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="fname"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="lname"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    label="Name Of Company"
                    name="company"
                    required
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    label="Contact Number"
                    name="contact"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="address"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Pick Up Address"
                margin="normal"
                name="address"
                required
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
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(UpdateProfile);
>>>>>>> cab0c04f3e1cca0e6dd279f0f2b1c538054cfab3:frontend/src/components/UserView/UpdateProfile.js
