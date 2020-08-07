import React, {useState} from 'react';
import {Grid, Button, Paper, Typography, FormControl, TextField, makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Loading from '../components/Loading';
import {connect} from 'react-redux';
import * as action from '../store/actions/auth';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    marginTop: '.5rem',
    marginBottom: '.5rem'
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper : {
    display: 'inline',
    width: '22.5rem',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: '1rem',
    paddingTop: '1rem'
  },
  fieldGrid : {
    width: '18rem',
    maxWidth: '100%',
    marginTop: '2rem',
    marginBottom: '2rem'
  },
 textFieldItems: {
   marginTop: '.75rem',
   marginBottom: '.25rem'
 },
  buttonGrid : {
    marginTop: '1.5rem',
    marginBottom: '2rem',
  }

});

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if(props.isAuthenticated) {
    console.log("Auth Complete")
  } else {
    console.log("Auth Failed")
  }

  let errorMessage = null;

  if (props.error) {
    console.log(props.error.response.status)
    errorMessage = (
      <Typography> {props.error.message} </Typography>
    )
  }



  const classes = useStyles();
  function handleChange(event) {
    event.preventDefault()
    event.target.name === 'username' ? setUsername(event.target.value) : setPassword(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(username)
    // console.log(password)
    props.onAuth(username, password)
  }
  return (
    <Grid container className={classes.root}>
    <Grid className={classes.grid} item xs={12} sm={12} md={12} lg={12} xl={12}>
      { props.isLoading ? ( <Loading />) : (
          <Paper elevation={1} className={classes.paper}>
            <Grid className={classes.grid} style={{ marginTop: '1rem'}}>
              <Typography variant="h4"> Login </Typography>
            </Grid>
            <Grid className={classes.formGrid}>
              <form onSubmit={handleSubmit}>
                <FormControl >
                  <Grid className={classes.fieldGrid}>
                    <TextField
                      fullWidth
                      id="username"
                      name="username"
                      label="Username"
                      value={username}
                      onChange={handleChange}
                      className={classes.textFieldItems}
                    />
                    <br />
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={handleChange}
                      className={classes.textFieldItems}
                    />
                  </Grid>
                  {errorMessage}
                  <Grid className={classes.buttonGrid}>
                    <Button type='submit' fullWidth variant='contained' color="primary"> Login </Button>
                  </Grid>
                </FormControl>
              </form>
              </Grid>
              <Typography> Do not have an account? <Link to="/register"> Register </Link> </Typography>
            </Paper>

            )

            }
      </Grid>
    </Grid>
  )
}
const mapStateToProps = (state) => {
    return {
      isLoading: state.loading,
      error: state.error,
      isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(action.authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
