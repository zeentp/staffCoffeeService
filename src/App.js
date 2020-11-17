import logo from './logo.svg';
import './App.css';
import LoginPage from './loginPage.js';
import HomePage from './homePage.js';
import OrderPage from './OrderPage.js';
import SalesPage from './SalesPage.js';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/HomePage' component={HomePage} />
          <Route path='/OrderPage' component={OrderPage} />
          <Route path='/SalesPage' component={SalesPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
