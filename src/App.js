import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom' // , Redirect

import { Grid } from 'react-bootstrap'

import Home from './Home'
import Assign from './Assign'
import Analyze from './Analyze'
import Learn from './Learn'
import Footer from './Footer'
import Sidebar from './Sidebar'
import New from './New'

// import { kaizenFetch } from './utilities'

import Auth from './Auth'

import './App.css';

const styles = {
  sidebar: {
    width: "20%",
    display: "inline-block",
    backgroundColor: "cornflowerblue"
  },
  content: {
    width: "80%",
    display: "inline-block"
  }
}

// import createHistory from 'history/createBrowserHistory'
// const history = createHistory({ forceRefresh: true })


const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) auth.handleAuthentication() 
}
const Callback = () => <div>Loading....</div>
const Login = ({ auth }) => <div>{ !auth.isAuthenticated() && <h1>Click the Sign In button on the left sidebar to get started</h1> }</div>

export default class App extends Component {
  render() {
    const Authorized = ({ component: Component, ...rest }) => {
      return <Route { ...rest } render={ props =>
        auth.isAuthenticated() ? ( 
          <Component { ...{ ...props, auth, ...rest } } />
        ) : (
          <Redirect to={{ 
            pathname: "/login", 
            state: { from: props.location } 
          }} />
        )
      } />
    }

    return (
      <BrowserRouter>
        <Grid style={ styles.container } className="App">
          <div style={ styles.sidebar } ><Sidebar auth={ auth } /></div>
          <div style={ styles.content } >
            <Route exact path="/login" render={ routeProps => <Login auth={ auth } { ...routeProps } /> } />
            <Authorized exact path="/" component={ Home } />
            <Authorized exact path="/analyze" component={ Analyze } />
            <Authorized exact path="/assign" component={ Assign } />
            <Authorized exact path="/learn" component={ Learn } />
            <Authorized exact path="/new" component={ New } />
            <Route exact path="/callback" render={ routeProps => { 
              handleAuthentication(routeProps)
              return <Callback { ...routeProps } />
            } } />
          </div>
          <Footer style={ styles.footer } />
        </Grid>
      </BrowserRouter> 
    )
  }
}