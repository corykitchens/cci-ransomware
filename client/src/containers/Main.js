import React, { Component } from 'react';
import CountdownClock from '../components/CountdownClock';
import PasswordInput from '../components/PasswordInput';
import Title from '../components/Title';
import ContentMessage from '../components/ContentMessage';
import Container from '../components/Container';
import Card from '../components/Card';
import Columns from '../components/Columns';
import Column from '../components/Column';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Ransomware',
      subtitle: 'Data deleted in:',
      debug: true,
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
      <Container>
        <Columns>
          <Column>
            <Card>
            {/* Ransomware Title */}
            <Title title={this.state.title} classes={'title has-text-danger has-text-centered'}/>
            {/* End Ransomware Title */}
            {/* Sub Title */}
            <Title title={this.state.subtitle} classes={'subtitle has-text-danger has-text-centered'} />
            {/* End Sub Title */}
            {/* Countdown Clock */}
            <CountdownClock />
            {/* End Countdown Clock */}
            
            {/* Ransom Message */}
            <ContentMessage message="Unless 2 BitCoin is received by haxxzor@tempmail.com" />
            {/* End Ransom Message */}
            {/* Instruction Message */}
            <ContentMessage message="To access admin functions: enter the following passwords:" />
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
            </Card>
          </Column>
        </Columns>
        <Columns>
          <Column>
          <h3>Found Passwords: {this.state.correctAttempts}</h3>
          </Column>
        </Columns>
      </Container>
    )
  }
}

export default Main;