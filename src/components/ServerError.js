import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'

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
    <Paper elevation={3} className={classes.rootPaper}>
        <Typography
          variant="h4"
          align="center"
          color="primary"
        >
          ERROR 404: Check Server Connection
        </Typography>
    </Paper>
  )
}
