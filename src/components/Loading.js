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
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
    >
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
