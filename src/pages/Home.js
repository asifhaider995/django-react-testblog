import React from 'react';
import { Typography, Grid, Paper, makeStyles } from '@material-ui/core';
import ArticleList from './ArticleList';
import ServerError from '../components/ServerError';
import Loading from '../components/Loading';


const useStyles = makeStyles({
  gridRoot: {
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    height: '100%',
  },
  grid: {
    margin: '1em'
  },
  paper : {
    alignItems: 'center',
    padding: '10px'
  },
  media: {
    height: '80%',
  },
  gridJumbo : {
    backgroundSize: 'cover',
  },
  overlay : {
      backgroundColor: 'white',
      opacity: '0.5',
      position: 'relative',
  },
  createBtn: {
    padding: '.5rem',
    marginTop: '1rem'
  }
});

export default function Home(props) {
  const classes = useStyles();

  const data = props.data
  const dataAvailable = props.dataAvailable
  const isLoading = props.isLoading

  function handleCardClick(id) {
    window.location.href='/'+id
  }
  return (
        <Grid className={classes.gridRoot} >
          <Typography align='center' variant='h2'> Article List </Typography>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.grid}>
            <Paper elevation={3} className={classes.paper}>
              {
                isLoading ? (
                  <Loading />
                ) : (!dataAvailable) ? (
                    <ServerError />
                ) : (
                  <ArticleList handleClick={handleCardClick} data={data} />
                )
              }
              </Paper>
            </Grid>
        </Grid>
  );
}
