import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import ServerError from '../components/ServerError';
import {useParams} from 'react-router-dom';
import {
  makeStyles,
  OutlinedInput,
  Typography,
  Grid, Paper,
  FormControl,
  FormHelperText,
  InputLabel,
  Input, Button} from '@material-ui/core';
import axios from 'axios';

//   Host names
//  'http://127.0.0.1:8000'
//  'https://djreact-testblog.herokuapp.com'



const useStyles = makeStyles((theme) => ({

  gridRoot: {
    flexWrap: 'wrap',
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    marginTop: '.5rem',
    marginBottom: '.5rem'
  },
  grid: {
    margin: '2em',
    maxWidth: '100%'
  },
  btnGrid: {
    display: 'flex',
    marginTop: '1rem',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      maxWidth: '25rem',
      marginLeft: '26rem'
    },
  },
  paper : {
    alignItems: 'center',
    padding: '10px'
  },
}));



export default function ArticleCreate(props) {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [dataAvailable, setDataAvailable] = useState(false)

  var {ID} = useParams();
  useEffect((thisID=ID) => {
    let unmounted = false;
    if(props.requestType === 'put') {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": 'Token '+props.token
      }
      axios.get('https://djreact-testblog.herokuapp.com/api/article/'+thisID+'/')
      .then( response => {
        if(!unmounted) {
          setTitle(response.data.title)
          setContent(response.data.content)
          setLoading(false)
          setDataAvailable(true)

        }
      }).catch(error => {
        if(!unmounted) {
          console.error(error, "Fetch Warning!")
          setLoading(false)
          setDataAvailable(false)
        }
      })
    } else {
      setLoading(false)
      setDataAvailable(true)
    }

    return () => { unmounted = true };
  },[ID, props])

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

  const handleSubmit = (event, requestType, articleID) => {
    event.preventDefault();
    const csrftoken = getCookie('csrftoken');
    switch (requestType) {
      case 'post':
        axios.defaults.headers = {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
          "Authorization": 'Token '+props.token
        }
        axios.post(`https://djreact-testblog.herokuapp.com/api/article/` , {
          "title": title,
          "content": content
        }).then(response => {
          console.log(response.status);
          props.handleDiscard()
        }).catch(error => console.error(error))
        break;
      case 'put':
        axios.defaults.headers = {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
          "Authorization": 'Token '+props.token,
        }
        axios.put(`https://djreact-testblog.herokuapp.com/api/article/`+(articleID)+`/` , {
          title: title,
          content: content
        }).then(response => {
          console.log(response.status)
          window.location.href=('/'+articleID+'/')
        }).catch(error => console.error(error))
        break;
      default:
        console.log('Default');
        break;


    }
  }
  const handleChange = (event) => {
      event.target.name === 'title' ? setTitle(event.target.value) : setContent(event.target.value);
  }

  return (
    <Grid className={classes.gridRoot}>
      <Paper elevation={3} className={classes.paper}>
          { (isLoading) ? (
            <Loading />
          ) : ( dataAvailable ? (
            <Grid className={classes.grid}>
              <Typography variant='h3' style={{ textAlign: 'center'}}> { props.requestType ==='post' ? 'Create' : 'Update'} Article </Typography>
              <form onSubmit={(event,requestType, articleID) =>{ handleSubmit(event, props.requestType, ID) }}>
              <Grid className={classes.grid}>
                <FormControl fullWidth style={{margin: '0.2rem'}} color='primary' variant='standard'>
                  <InputLabel htmlFor="my-input">Title</InputLabel>
                  <Input
                    fullWidth
                    id="my-input"
                    aria-describedby="my-helper-text"
                    name="title" value={title} onChange={handleChange}
                  />
                  <FormHelperText id="my-helper-text">0 / 25</FormHelperText>
                </FormControl>
              </Grid>
              <Grid className={classes.grid}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="component-outlined">Article</InputLabel>
                  <OutlinedInput
                    fullWidth autoFocus multiline
                    rows={10}
                    id="component-outlined"
                    name="content" value={content} onChange={handleChange}
                    label="article" />
                  <FormHelperText id="my-helper-text">0 / 500</FormHelperText>
                </FormControl>
                <Grid className={classes.btnGrid}>
                  <Button
                    onClick={props.handleDiscard}
                    fullWidth
                    variant='contained'
                    color='secondary'
                    style={{marginRight: '.5rem'}}
                  > Discard { props.requestType !=='put' ? 'Article' : 'Update'}
                  </Button>
                  <Button
                    type='submit'
                    fullWidth
                    color='primary'
                    variant='contained'
                    style={{marginLeft: '.5rem'}}
                  >
                    { props.requestType !=='put' ? 'Submit' : 'Update'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        ) : ( <ServerError />))
          }
      </Paper>
    </Grid>
  )
}
