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
  console.log(ID)
  useEffect((thisID=ID) => {
    let unmounted = false;
    console.log("Create: "+props.token)
    if(props.requestType === 'put') {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": 'Token '+props.token
      }
      axios.get('http://127.0.0.1:8000/api/article/'+thisID+'/')
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


  const handleSubmit = (event, requestType, articleID) => {
    console.log("Submitted")
    event.preventDefault();
    console.log(title)
    console.log(content)
    switch (requestType) {
      case 'post':
        console.log('POST')
        console.log("Create: "+props.token)
        axios.defaults.headers = {
          "Content-Type": "application/json",
          "Authorization": 'Token '+props.token
        }
        axios.post(`http://127.0.0.1:8000/api/article/` , {
          title: title,
          content: content
        }).then(response => {
          console.log(response.status);
          props.handleDiscard()
        }).catch(error => console.error(error))
        break;
      case 'put':
        console.log('PUT')
        axios.defaults.headers = {
          "Content-Type": "application/json",
          "Authorization": 'Token '+props.token,
        }
        axios.put(`http://127.0.0.1:8000/api/article/`+(articleID)+`/` , {
          title: title,
          content: content
        }).then(response => {
          console.log(response.status)
          window.location.href=('/'+articleID+'/')
        }).catch(error => console.error(error))
        break;
      default:
        console.log('Default')


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
          ) : ( (dataAvailable) ? (
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
          ) : ( <ServerError />) )
          }
      </Paper>
    </Grid>
  )
}
