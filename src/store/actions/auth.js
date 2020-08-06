import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  axios.post('https://djreact-testblog.herokuapp.com/rest-auth/logout/').catch(error => console.log(error))
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expirationDate) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationDate * 1000)
  }
}

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('https://djreact-testblog.herokuapp.com/rest-auth/login/',{
      "username": username,
      "password": password
    }).then(response => {
        const token = response.data.key;
        const expireDate = new Date(new Date().getTime() + 3600 * 1000)
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expireDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600)); // One hour
    }).catch(error => {
      dispatch(authFail(error))
    })
  }
}


export const authRegister = (username, email, password, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('https://djreact-testblog.herokuapp.com/rest-auth/registration/',{
      "username": username,
      "email": email,
      "password1": password,
      "password2": password2
    }).then(response => {
        const token = response.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600)); // One hour
    }).catch(error => {
      dispatch(authFail(error))
    })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if( token === undefined) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ))
      }
    }
  }
}
