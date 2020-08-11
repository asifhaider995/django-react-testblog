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
    marginTop: '.5rem',
    marginBottom: '.5rem',
    height: '50rem',
  },
  grid: {
    margin: '1em'
  },
  paper : {
    alignItems: 'center',
    padding: '10px'
  },
  cardRoot: {
    maxWidth: '100%',
    alignItems: 'center',
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
  function handleCardClick(id) {
    window.location.href='/'+id
  }
  return (
        <Grid className={classes.gridRoot} >
          <Typography align='center' variant='h2'> Article List </Typography>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.grid}>
            <Paper elevation={3} className={classes.paper}>
              {
                (props.dataAvailable && !props.isLoading) ? (
                  props.data.map((items) => {
                    return (
                      <Grid
                        key={items.id}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        <ArticleList onClick={() => handleCardClick(items.id)} title={items.title} content={items.content} className={classes.cardRoot}/>
                      </Grid>
                    )
                  })
                ) : ( (!props.isLoading && !props.dataAvailable) ? (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <ServerError />
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Loading />
                  </Grid>
                ))
              }
              </Paper>
            </Grid>
        </Grid>
  );
}
