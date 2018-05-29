import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Title from '../components/Title';
import ContentMessage from '../components/ContentMessage';
import Container from '../components/Container';
import Card from '../components/Card';
import Columns from '../components/Columns';
import Column from '../components/Column';
import '../components/CountdownClock.css';



class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Ransomware',
      subtitle: 'Login',
      username: '',
      password: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
      this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    console.log('Woohoo submit');
    e.preventDefault();
    const { attempt } = this.state;
    this.props.attemptPassword(attempt);
  }

  render() {
    return (
      <Container>
        <Columns>
          <Column>
            <Card className="card-container">
            <Title title={this.state.title} classes={'title has-text-danger has-text-centered'}/>
            <Title title={this.state.subtitle} classes={'subtitle has-text-danger has-text-centered'} />
            <div className="content">
              <div className="field">
                <label class="label">Team Username</label>
                <input className="input" type="text" placeholder="Team Name" value={this.state.username} onChange={this.handleUsernameChange}/>
              </div>
              <input className="input" type="password" placeholder="Password" value={this.state.password}  onChange={this.handlePasswordChange}/>
              <Link to="/rules">
                <button className="button is-info is-rounded submit-btn">Login</button>
              </Link>
            </div>
            </Card>
          </Column>
        </Columns>
      </Container>

    )
  }
}

export default Login;