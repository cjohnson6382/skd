import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom' // , Redirect

import { Grid } from 'react-bootstrap'

import Home from './Home'
// import Networks from './Networks'
// import Reset from './Reset'
import Footer from './Footer'
import Sidebar from './Sidebar'
// import Detailed from './Detailed'

import { kaizenFetch } from './utilities'

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

class App extends Component {
  constructor (props) {
    super(props)

    this.getInspections = this.getInspections.bind(this)
  }

  state = { inspections: [], loading: false }

  componentDidMount () { this.getInspections() }

  async getInspections () { 
    this.setState({ loading: true })
    this.setState({
      inspections: await (await kaizenFetch("GET")("get_inspections")()).json(),
      loading: false
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Grid style={ styles.container } className="App">
          <div style={ styles.sidebar } ><Sidebar /></div>
          <div style={ styles.content } >
            <Route exact path="/" render={ routeProps => <Home { ...routeProps } /> } />
          </div>
          <Footer style={ styles.footer } />
        </Grid>
      </BrowserRouter> 
    )
  }
}


/*
            <Route 
              exact 
              path="/" 
              render={ (routeProps) => (
                <Home 
                  { ...routeProps } 
                  networks={ this.state.networks } 
                  stored={ this.state.stored } 
                  storedNetworks={ this.storedNetworks } 
                  getNetworks={ this.getNetworks } 
                />
              ) } 
            />
            <Route 
              exact 
              path="/networks" 
              render={ (routeProps) => (
                <Networks 
                  { ...routeProps }
                  stored={ this.state.stored }
                  getNetworks={ this.getNetworks } 
                />
              ) } 
            />
            <Route 
              exact 
              path="/reset" 
              render={ (routeProps) => (
                <Reset 
                  { ...routeProps } 
                  getNetworks={ this.getNetworks } 
                />
              ) } 
            />
            <Route 
              exact 
              path="/detailed/:network" 
              render={ (routeProps) => (
                <Detailed 
                  { ...routeProps } 
                  networks={ this.state.networks } 
                />
              ) } 
            />
*/

export default App