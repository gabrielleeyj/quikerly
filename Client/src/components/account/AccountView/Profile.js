import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { storage } from '../../../Firebase/Config';
import { updateProfile } from '../../../Store/actions/authActions';
import { connect } from 'react-redux';


const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const imageUpload = (image, setUrl) => {
  const storageRef = storage.ref(image.name)
  storageRef.put(image).on('state_changed', snap => console.log(snap), err => console.log(err), async () => {
    try {
      const url = await storageRef.getDownloadURL();
      setUrl(url);
    } catch (e) {
      console.log(e)
    }
  })
}

const Profile = ({ className, user, updateProfile, ...rest }) => {
  const classes = useStyles();
  const [url, setUrl] = useState(null)

  const onChange = (e) => {
    imageUpload(e.target.files[0], setUrl)
  }
  useEffect(() => {
    if (url) {
      user['photo'] = url;
      updateProfile(user)
    }
    return () => {
      setUrl(null)
    }
  }, [url])
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.photo}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.userName}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input
          accept="image/jpeg,image/png"
          type="file"
          onChange={onChange}
          id="image"
          style={{ display: 'none', }} />
        <Button
          color="primary"
          fullWidth
          onClick={() => {
            document.getElementById('image').click()
          }}
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => dispatch(updateProfile(data)),
  }
}

export default connect(null, mapDispatchToProps)(Profile);