import React from 'react'
import { makeStyles, Grid, Paper, Typography } from '@material-ui/core'

export default function ServerError(props) {
  const useStyles = makeStyles({
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
            ERROR 404: Check Server Connection
          </Typography>
      </Paper>
    </Grid>
  )
}
