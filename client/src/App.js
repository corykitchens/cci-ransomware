import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Login from './containers/Login';
import Rules from './containers/Rules';
import Main from './containers/Main';
import './components/CountdownClock.css';
import 'whatwg-fetch';


class App extends Component {

  componentWillMount() {
    fetch('/api/')
      .then(resp => resp.json())
      .then(resp => console.log(resp))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/rules" component={Rules} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
