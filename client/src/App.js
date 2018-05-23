import React, { Component } from 'react';
import Main from './containers/Main';
import 'whatwg-fetch';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    fetch('/api/')
      .then(resp => resp.json())
      .then(resp => console.log(resp))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Main />
    );
  }
}

export default App;
