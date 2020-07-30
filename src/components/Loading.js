import React from 'react'
import { makeStyles, Paper, Grid, Typography, CircularProgress } from '@material-ui/core'

export default function Loading(props) {
  const useStyles = makeStyles({
      rootGrid: {
        maxWidth: '100%',
        maxHeight: '100%',
        justifyContent: 'center'
      },
      rootPaper : {
        alignItems: 'center',
        padding: '5rem',
        maxWidth: '100%',
        maxHeight: '100%',
      },
  });
  const classes = useStyles();

  return (
    <Grid>
      <Paper elevation={3} className={classes.rootPaper}>
          <Typography
            variant="h4"
            align="center"
            color="primary"
          >
            <CircularProgress color='primary'> Loading... </CircularProgress>
          </Typography>
      </Paper>
    </Grid>
  )
}
