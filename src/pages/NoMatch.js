import React from 'react';
import {Paper, Typography, Grid, makeStyles} from '@material-ui/core';

export default function NoMatch() {
  const useStyles = makeStyles({
      gridRoot: {
        maxWidth: '100%',
        maxHeight: '100%',
        alignItems: 'center',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      },
      grid: {
        margin: '1rem'
      },
      paper : {
        alignItems: 'center',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        maxWidth: '100%',
        maxHeight: '100%',
      },
    });
  const classes = useStyles();
  return (
    <Grid className={classes.gridRoot}>
      <Grid className={classes.grid} >
        <Paper elevation={3} className={classes.paper}>
            <Typography
              variant="h4"
              align="center"
              color="primary"
            >
              ERROR 404: Page does not exist
            </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
