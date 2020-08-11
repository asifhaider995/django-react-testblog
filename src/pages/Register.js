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
   errorMessage: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     width: '18rem',
     height: '100%',
   },
   buttonGrid : {
    marginTop: '1.5rem',
    marginBottom: '2rem',
   }

  });


function Register(props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const classes = useStyles();

  if (props.error) {
    const message = props.error.response.status === 400 ?
    "Both Passwords need to match"
    : props.error.message;
    errorMessage = (
      <Typography style={{whiteSpace: 'pre-line'}} align='center' variant='subtitle2' color='error'> {message} </Typography>
    )
  }
  const handleChange = (event) => {
    event.preventDefault();
    switch (event.target.name) {
      case 'username': setUsername(event.target.value); break;
      case 'email': setEmail(event.target.value); break;
      case 'password': setPass(event.target.value); break;
      case 'password2': setConfirmPass(event.target.value); break;
      default: setPass(''); setConfirmPass(''); break;

    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    props.onRegister(username, email, pass, confirmPass)
    if(props.isAuthenticated) {
      console.log("Reg Complete")
      window.location.href='/'
    } else {
      console.log("Reg Failed")
      setPass('');
      setConfirmPass('');
    }
  }
  return (
    <Grid container className={classes.root}>
      <Grid className={classes.grid} item xs={12} sm={12} md={12} lg={12} xl={12}>
        {
          props.isLoading ? (<Loading />) : (
            <Paper elevation={1} className={classes.paper}>
              <Grid className={classes.grid} style={{ marginTop: '1rem'}}>
                <Typography variant="h4"> Register </Typography>
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
                        id="email-input"
                        name="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        className={classes.textFieldItems}
                      />
                      <br />
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Enter Password"
                        type="password"
                        autoComplete="current-password"
                        value={pass}
                        onChange={handleChange}
                        className={classes.textFieldItems}
                      />
                      <br />
                      <TextField
                        fullWidth
                        id="password-2"
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        value={confirmPass}
                        onChange={handleChange}
                        className={classes.textFieldItems}
                      />
                    </Grid>
                    <Grid className={classes.errorMessage}>
                      {errorMessage}
                    </Grid>
                    <Grid className={classes.buttonGrid}>
                      <Button type='submit' fullWidth variant='contained' color="primary"> Register </Button>
                    </Grid>
                  </FormControl>
                </form>
              </Grid>
              <Typography> Already have an account? <Link to="/login"> Login </Link> </Typography>
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
    onRegister: (username, email, password, password2) => dispatch(action.authRegister(username, email, password, password2))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
