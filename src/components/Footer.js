import React from 'react';
import {Grid, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    color:'white',
    textAlign: 'center',
    padding: '2rem 6rem',
    marginTop: '2rem'
  }
}));

export default function Footer () {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
    >
      <Grid style={{ maxWidth: '50rem'}}>
        <Typography align='center' variant='h6'>Test Blog &copy; Asif Haider 2020 </Typography>
        <br />
        <Typography align='center' variant='body1'>Test Blog is my first up and running, on production, testing blog site made with React.js, Redux, Material-UI, Django and Django Rest Framework. It is session authenticated, minimally secured, where anyone can update or delete anyone else's post. <br /> Please do not kindly wreck this site. Thank you. <br /> Regards, @asifhaider995 </Typography>
        <Typography align='center' variant='body1'> Visit <a href='https://www.github.com/asifhaider995/django-react-testblog' target='_blank' rel='noopener noreferrer'> my github repository </a> for the <strong>source code</strong></Typography>
      </Grid>
    </Grid>
  )
}
