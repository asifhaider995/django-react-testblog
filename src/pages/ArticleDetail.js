import React from 'react';
import {useState, useEffect} from 'react';
import {Paper, Icon, Typography, Grid, Button, CardActions, makeStyles} from '@material-ui/core';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import ServerError from '../components/ServerError';
import Loading from '../components/Loading';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';


export default function ArticleDetail(props) {
  const [article, setArticle] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isDataAvailable, setDataAvailable] = useState(false)
  var {ID} = useParams();
  console.log(ID)
  console.log(props.isAuthenticated)
  useEffect((thisID=ID) => {
    let unmounted = false;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization": 'Token '+props.token
    }
    axios.get('http://127.0.0.1:8000/api/article/'+thisID+'/')
    .then( response => {
      if(!unmounted) {
        setArticle(response.data)
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

    return () => { unmounted = true };
  },[ID, props.token])
  const useStyles = makeStyles((theme) => ({
      gridRoot: {
        maxWidth: '100%',
        maxHeight: '100%',
        alignItems: 'center',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        marginTop: '1rem',
        marginBottom: '1rem'
      },
      grid: {
        margin: '1rem',
      },
      paper : {
        alignItems: 'center',
        padding: '2rem'
      },
      errorPaper : {
        alignItems: 'center',
        padding: '5rem'
      },
      loadingPaper : {
        alignItems: 'center',
        padding: '5rem'
      },
      backButton : {
        marginBottom: '0.5rem'
      },
      actionButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      actionButtonIcons: {
        marginRight: '.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          display: 'flex',
          margin: '0 .5rem'
        }
      },
      createBtn : {
        marginTop: '1rem'
      },
      updateBtn : {
        marginTop: '1rem'
      },
      deleteBtn : {
        marginTop: '1rem'
      }
    }));
  const classes = useStyles();
  return (
    <Grid className={classes.gridRoot}>
      {
        (isLoading) ? (
          <Loading />
          ) : ( (isDataAvailable) ? (
            <Paper elevation={3} className={classes.paper}>
              <Grid>
                <Button
                  className={classes.backButton}
                  color='secondary'
                  variant='contained'
                  onClick={event => window.location.href='/'}
                >Go Back</Button>
              </Grid>
              <Paper elevation={1} className={classes.paper}>
                <Typography
                  gutterBottom
                  variant="h4"
                  align="center"
                  color="secondary"
                >
                  {article.title}
                </Typography>
                <Grid className={classes.grid}>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography>
                            {article.content}
                        </Typography>
                    </Paper>
                    <Grid className={classes.grid}>
                      <CardActions>
                        <Button fullWidth color='primary' size='medium' variant='text' className={classes.actionButtons}><Icon className={classes.actionButtonIcons}><FavoriteBorderIcon /></Icon>Like</Button>
                        <Button fullWidth color='secondary' size='medium' variant='text' className={classes.actionButtons}><Icon className={classes.actionButtonIcons}><CommentIcon /></Icon>Comment</Button>
                        <Button fullWidth color='inherit' size='medium' variant='text' className={classes.actionButtons}><Icon className={classes.actionButtonIcons}><ShareIcon /></Icon>Share </Button>
                      </CardActions>
                    </Grid>
                </Grid>
              </Paper>
              <Grid>
                <Button
                  onClick={(id) => {props.handleUpdate(ID)}} className={classes.updateBtn}
                  variant='contained' color='inherit' fullWidth> Update this Article </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={(id) => {props.handleDelete(ID)}} className={classes.deleteBtn}
                  variant='contained' color='secondary' fullWidth> Delete this Article </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={props.handleCreate} className={classes.createBtn}
                  variant='contained' color='primary' fullWidth> Create an Article </Button>
              </Grid>
            </Paper>
          ) : (
            <ServerError />
          )

        )
      }
    </Grid>
  );
}
