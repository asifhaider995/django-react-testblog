import React from 'react';
import {Grid, Paper, Typography, Avatar, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%'
  },

}))
function UserProfile(props) {

  user = props.user

  return (
    <Grid id='profile' className={classes.root}>
      <Grid className={classes.userInfo}>
        <Paper>
          <Grid className={classes.avatarGrid}>
            <Avatar />
          </Grid>
          <Grid className={classes.infoGrid}>
            <Typography>@Username</Typography>
            <hr />
            <Typography> Details </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid className={classes.userContent}>
        <Grid className={classes.contentHeading}>
          <Typography> Articles by user </Typography>
        </Grid>
        <Grid className={classes.contentBody}>
          <Paper>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}
