import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../Page/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import GeneralToolbar from '../../GeneralToolbar/GeneralToolbar';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
  },
  top: {
    paddingTop: theme.spacing(10)
  }
}));

const Account = ({ userData }) => {
  const classes = useStyles();
  return (
    <Page
      className={classes.root}
    >
      <GeneralToolbar name='Profile' >

        <Container className={classes.top} maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              {userData && <Profile user={userData} />}
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              {userData && <ProfileDetails user={userData} />}
            </Grid>
          </Grid>
        </Container>
      </GeneralToolbar>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData
  }
}

export default connect(mapStateToProps, null)(Account);
