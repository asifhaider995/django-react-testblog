import React, {useState, useEffect} from 'react';

/////////////////// Pages ///////////////////////////////
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import ArticleCreate from './pages/ArticleCreate';
import ArticleDelete from './pages/ArticleDelete';
import Login from './pages/Login';
import Register from './pages/Register';
import NoMatch from './pages/NoMatch';

////////////////// Components ///////////////////////////
import Layout from './components/Layout';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';

////////////// Redux imports ///////////////////////////
import {connect} from 'react-redux';
import * as actions from './store/actions/auth'
////////////////////////////////////////////////////////

//   Available Hosts
//  'http://127.0.0.1:8000'
//  'https://djreact-testblog.herokuapp.com'



const mapStateToProps = (state) => {
  return {
    token: state.token,
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onTryAutoSignup : () => {dispatch(actions.authCheckState())},
      logOut          : () => {dispatch(actions.logout())}
    }
}

function App(props) {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [dataAvailable, setDataAvailable] = useState(false)
  useEffect(() => {
    let unmounted = false;
    props.onTryAutoSignup()
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization": 'Token '+props.token
    }
    // axios.get("http://127.0.0.1:8000/api/article/")
    axios.get("https://djreact-testblog.herokuapp.com/api/article/")
    .then( response => {
      if(!unmounted) {
        setUsers(response.data)
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
  },[props])

  const handleOpenCreate = () => {
    window.location.href='/create';
  }
  const handleDiscard = () => {
    window.location.href='/';
  }
  const handleArticleUpdate = (id) => {
    window.location.href='/update/'+id;

  }
  const handleArticleDelete = (id) => {
    window.location.href ='/delete/'+id;
  }
  return (
    <React.Fragment>
        <Router>
          <NavBar {...props} handleCreate={handleOpenCreate}/>
          <Layout>
            <Switch>
              <Route exact path="/login">
                { props.isAuthenticated ? (<Redirect to='/'/>) : (<Login />) }
              </Route>
              <Route exact path="/register">
                { props.isAuthenticated ? (<Redirect to='/'/>) : (<Register />) }
              </Route>
              <Route exact path="/" >
                { !props.isAuthenticated ? (<Redirect to='/login' />) : (
                  <Home
                    {...props}
                    data={users}
                    dataAvailable={dataAvailable}
                    isLoading={isLoading}
                    handleCreate={handleOpenCreate}
                  />) }
              </Route>
              <Route exact path="/create">
                {(localStorage.getItem('token') === null) && (<Redirect to='/login' />)}
                <ArticleCreate token={props.token} requestType='post' handleDiscard={handleDiscard}/>
              </Route>
              <Route exact path="/update/:ID">
                {(localStorage.getItem('token') === null) && (<Redirect to='/login' />)}
                <ArticleCreate token={props.token} requestType='put' handleDiscard={handleDiscard}/>
              </Route>
              <Route exact path="/delete/:ID">
                {(localStorage.getItem('token') === null) && (<Redirect to='/login' />)}
                <ArticleDelete token={props.token} handleRedirect={handleDiscard}/>
              </Route>
              <Route exact path="/:ID">
                {(localStorage.getItem('token') === null) && (<Redirect to='/login' />)}
                <ArticleDetail
                  token={props.token}
                  handleCreate={handleOpenCreate}
                  handleUpdate={handleArticleUpdate}
                  handleDelete={handleArticleDelete} />
              </Route>
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      <Footer />
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
