import React from 'react';
import { ReactComponent as Logo } from "../components/logo.svg";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const styles = (theme) => ({
  title: {
    display: 'block',
    fontSize: 2,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.common.white,
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: "#434d4f" }}>
        <Toolbar className={classes.toolbar}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            to="/"
          >
            {<Logo />}
          </Link>
          <div className={classes.right}>
            <Link
              className={classes.rightLink}
              to='/sign-in' >
              <Button
                variant="outlined"
                color="inherit"
              >
                Sign In
            </Button>
            </Link>
            <Link
              className={clsx(classes.rightLink, classes.linkSecondary)}
              to='/sign-up' >
              <Button
                variant="contained"
                color="secondary"
                disableElevation
              >
                Sign Up
            </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);