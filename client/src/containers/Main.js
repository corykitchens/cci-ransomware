import React, { Component } from 'react';
import CountdownClock from '../components/CountdownClock';
import PasswordInput from '../components/PasswordInput';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordAttempts: 0,
      correctAttempts: 0,
      incorrectAttempts: 0,
      passwords: ['hello', 'password123', 'qwerty', 'letmein', 'abc123', 'mypassword']
    }
    this.attemptPassword = this.attemptPassword.bind(this);
  }

  attemptPassword(data) {
    console.log('Attempted password ->' + data);
    this.state.passwords.filter((p) => {
      if (p === data) {
        this.setState({ correctAttempts: ++this.state.correctAttempts});
      } else {
        this.setState({ incorrectAttempts: ++this.state.incorrectAttempts});
      }
      this.setState({ passwordAttempts: ++this.state.passwordAttempts});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          
          <div className="column">
            {/* Ransomware Title */}
            <h1 className="title">Ransomware</h1>
            {/* End Ransomware Title */}
            
            {/* Sub Title */}
            <h2 className="subtitle">Data deleted in:</h2>
            {/* End Sub Title */}
            <h3>Found Passwords: {this.state.correctAttempts}</h3>
            {/* Countdown Clock */}
            <CountdownClock />
            {/* End Countdown Clock */}
            
            {/* Ransom Message */}
            <div className="content">
            Unless 2 BitCoin is received by haxxzor@tempmail.com
            </div>
            {/* End Ransom Message */}
            
            {/* Instruction Message */}
            <div className="content">
            To access admin functions: enter the following passwords:
            </div>
            {/* End Instruction Message */}

            {/* TODO - Do some sort of repeat/forEach? */}
            {/* Passwords Container */}
            <div className="columns">
              {/* Password */}
              <PasswordInput attemptPassword={this.attemptPassword}/>
              {/* End Password */}
              {/* Password */}
              <PasswordInput attemptPassword={this.attemptPassword}/>
              {/* End Password */}
            </div>
            {/* End Passwords Container*/}
            {/* Passwords Container */}
            <div className="columns">
              {/* Password */}
              <PasswordInput attemptPassword={this.attemptPassword}/>
              {/* End Password */}
              {/* Password */}
              <PasswordInput attemptPassword={this.attemptPassword}/>
              {/* End Password */}
            </div>
            {/* End Passwords Container*/}
            {/* Passwords Container */}
            <div className="columns">
              {/* Password */}
              <PasswordInput attemptPassword={this.attemptPassword}/>
              {/* End Password */}
              {/* Password */}
              <PasswordInput attemptPassword={this.attemptPassword}/>
              {/* End Password */}
            </div>
            {/* End Passwords Container*/}
          </div>
        </div>
      </div>
    )
  }
}

export default Main;