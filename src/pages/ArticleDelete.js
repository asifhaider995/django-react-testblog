import React, { useEffect, useState } from 'react';
import { Grid, Paper, Button, Typography, FormControl, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ServerError from '../components/ServerError';
import Loading from '../components/Loading';


//   Host names
//  'http://127.0.0.1'
//  'https://djreact-testblog.herokuapp.com'



const useStyles = makeStyles((theme) => ({
  gridRoot: {
    maxWidth: '100%',
    maxHeight: '100%',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    marginTop: '.5rem',
    marginBottom: '.5rem'
  },
  grid: {
    margin: '2em',
    maxWidth: '100%',
  },
  paper : {
    padding: '10px',
    maxWidth: '100%',
    width: '100%'
  },

  formGrid: {
    alignItems: 'center',
    textAlign: 'center',
  },
  discardBtn: {
    padding:'.4rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  deleteBtn: {
    marginTop: '1rem'
  },
}));


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}

export default function ArticleDelete(props) {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [dataAvailable, setDataAvailable] = useState(false)

  var {ID} = useParams();

  useEffect((thisID=ID) => {
    let unmounted = false;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization": 'Token '+props.token
    }
    axios.get(`http://127.0.0.1:8000/api/article/${thisID}/`)
    // axios.get(`https://djreact-testblog.herokuapp.com/api/article/${thisID}/`)
    .then( response => {
      if(!unmounted) {
        setTitle(response.data.title)
        setLoading(false);
        setDataAvailable(true);
      }
    }).catch(error => {
      if(!unmounted) {
        console.error(error, "Fetch Warning!")
        setLoading(false);
        setDataAvailable(false);
      }
    })

    return () => { unmounted = true };
  },[ID, props.token])


  const handleDelete = (event, articleID) => {
    event.preventDefault();
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers = {
      "X-CSRFToken": csrftoken,
      "Content-Type": "application/json",
      "Authorization": 'Token '+props.token
    }
    axios.delete(`http://127.0.0.1:8000/api/article/${ID}/`)
    // axios.delete(`https://djreact-testblog.herokuapp.com/api/article/${ID}/`)
    .then(response => {
      console.log(response.status);
      props.handleRedirect()
    }).catch(error => console.error(error))

  }

  const handleDiscard = () => {
    window.location.href = '/'+ID
  }
  return (
    <Grid className={classes.gridRoot}>
      <Paper elevation={3} className={classes.paper}>
        { isLoading ? (
          <Loading />
        ) : ( (dataAvailable) ? (
          <Grid className={classes.grid}>
            <Grid className={classes.grid}>
              <Button onClick={props.handleRedirect} variant='contained' color='primary'> Go Back </Button>
            </Grid>
            <form onSubmit={(event, articleID) =>{ handleDelete(event, ID) }}>
            <Typography color='inherit' variant='h3' style={{textAlign: 'center'}}> Delete Article </Typography>
              <Grid className={classes.formGrid}>
                <FormControl variant='standard'>
                  <Typography variant='h6'> Are you sure you want to delete this article '{title}'? </Typography>
                  <Typography variant='subtitle1'>This might be lost forever</Typography>
                  <Button type='submit' variant='contained' color='secondary' className={classes.deleteBtn}> Delete </Button>
                  <Button onClick={handleDiscard} variant='contained' color='primary' className={classes.discardBtn}> Cancel </Button>
                </FormControl>
              </Grid>
            </form>
          </Grid>
        ) : (
          <ServerError />
        )
      )
      }
      </Paper>
    </Grid>
  )
}
