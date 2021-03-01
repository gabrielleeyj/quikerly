import withRoot from './withRoot';
import React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './components/Typography';
import AppAppBar from './views/AppAppBar';
import AppForm from './views/AppForm';
import RFTextField from './form/RFTextField';
import FormButton from './form/FormButton';
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

function ForgotPassword() {
  const classes = useStyles();

  const setPassword = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const handleSubmit = () => {
    let email = document.getElementById('email').value
    if (email.includes('@') && email.includes('.com')) {
      setPassword(email)
    }
    else {
      alert('Enter a valid email')
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              'send you a link to reset your password.'}
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }} noValidate >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Field
                fullWidth
                component={RFTextField}
                label="Email"
                margin="normal"
                id='email'
                name="email"
                required
                size="large"
              />
              <FormButton
                className={classes.button}
                size="large"
                color="secondary"
                fullWidth
              >
                Send Reset Link
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(ForgotPassword);