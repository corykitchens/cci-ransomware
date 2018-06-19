import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false
    }
    this.logout = this.logout.bind(this);

  }

  logout() {
    // Zero out localStorage data
    localStorage.clear();
    this.setState({isLoggedOut: true});
  }

  render() {
    if (this.state.isLoggedOut) {
      return <Redirect to='/' />
    }
    return (
        <nav class="navbar is-info" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item">
              CCI Ransomware
            </a>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <a class="button is-warning" onClick={this.logout}>
                Logout
              </a>
            </div>
          </div>
        </nav>
    )
  }
}

export default Navbar;