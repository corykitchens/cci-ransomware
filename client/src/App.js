import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Login from './containers/Login';
import Rules from './containers/Rules';
import Main from './containers/Main';
import AdminView from './containers/AdminView';
import './components/CountdownClock.css';
import 'whatwg-fetch';


class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin" component={AdminView} />
          <Route path="/main" component={Main} />
          <Route path="/rules" component={Rules} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
