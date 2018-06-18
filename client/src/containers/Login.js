import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import {browserHistory} from 'react-router';
import Modal from '../components/Modal';
import Title from '../components/Title';
import ContentMessage from '../components/ContentMessage';
import Container from '../components/Container';
import Card from '../components/Card';
import Columns from '../components/Columns';
import Column from '../components/Column';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Ransomware',
      subtitle: 'Login',
      username: '',
      password: '',
      modalText: '',
      isAdmin: false
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.auth = this.auth.bind(this);
    this.enableModal = this.enableModal.bind(this);
    this.disableModal = this.disableModal.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { attempt } = this.state;
    this.props.attemptPassword(attempt);
  }

  enableModal() {
    this.setState({modalClasses: 'is-active'});
  }

  disableModal() {
    this.setState({modalClasses: ''});
  }

  auth() {
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(resp => resp.json())
    .then(results => {
      const { token, isAdmin } = results;
      
      if (isAdmin) {
        this.setState({isAdmin: true});
        localStorage.setItem('isAdmin', true);
      }
      localStorage.setItem('token', token);
      this.setState({authenticated: true});
    })
    .catch(err => {
      this.setState({modalText: 'Invalid Credentials'});
      this.enableModal();
    });
  }

  render() {
    if (this.state.authenticated && this.state.isAdmin) {
      return <Redirect to='/admin' />
    }
    else if (this.state.authenticated) {
      return <Redirect to='/rules' />
    }
    return (
      <Container>
        <Columns>
          <Column>
            <Card className="card-container">
            <Title title={this.state.title} classes={'title has-text-danger has-text-centered'}/>
            <Title title={this.state.subtitle} classes={'subtitle has-text-danger has-text-centered'} />
            <Columns>
              <Column>
                <form>
                  <div className="column is-half is-offset-one-quarter">
                    <div className="content login-form">
                      <div className="field">
                        <label className="label">Team Username</label>
                        <input className="input" type="text" placeholder="Team Name" value={this.state.username} onChange={this.handleUsernameChange}/>
                      </div>
                      <div className="field">
                        <label className="label">Password</label>
                        <input className="input" type="password" placeholder="Password" value={this.state.password}  onChange={this.handlePasswordChange}/>
                      </div>
                        <div class="has-text-centered">
                          <button className="button is-info is-rounded has-text-centered submit-btn" onClick={this.auth}>Login</button>
                        </div>
                    </div>
                  </div>
                </form>
              </Column>
            </Columns>
            </Card>
          </Column>
        </Columns>
        <Modal classNames={this.state.modalClasses} disableModal={this.disableModal} modalText={this.state.modalText}/>
      </Container>
    )
  }
}

export default Login;