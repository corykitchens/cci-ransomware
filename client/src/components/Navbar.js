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
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item">
              CCI Ransomware
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <a className="button is-warning" onClick={this.logout}>
                Logout
              </a>
            </div>
          </div>
        </nav>
    )
  }
}

export default Navbar;