import * as actionTypes from './actionTypes';
import axios from 'axios';

//   Host names
//  'http://127.0.0.1'
//  'https://djreact-testblog.herokuapp.com'

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
  axios.post('https://djreact-testblog.herokuapp.com/rest-auth/logout/')
  // axios.post('http://127.0.0.1:8000/rest-auth/logout/')
  .catch(error => console.error(error))
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

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers = {
      "X-CSRFToken": csrftoken,
      "Content-Type": "application/json",
    }
    // axios.post('https://djreact-testblog.herokuapp.com/rest-auth/login/',{
    axios.post('http://127.0.0.1:8000/rest-auth/login/',{
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
    // axios.post('http://127.0.0.1:8000/rest-auth/registration/',{
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
