import React, { Component } from 'react';
import Column from './Column';
import Columns from './Columns';
import PasswordInput from './PasswordInput';


class PasswordManager extends Component {
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
            <Column>
                <Columns>
                    {/* Password */}
                    <PasswordInput attemptPassword={this.attemptPassword}/>
                    {/* End Password */}
                    {/* Password */}
                    <PasswordInput attemptPassword={this.attemptPassword}/>
                    {/* End Password */}
                </Columns>
                <Columns>
                    {/* Password */}
                    <PasswordInput attemptPassword={this.attemptPassword}/>
                    {/* End Password */}
                    {/* Password */}
                    <PasswordInput attemptPassword={this.attemptPassword}/>
                    {/* End Password */}
                </Columns>
                <Columns>
                    {/* Password */}
                    <PasswordInput attemptPassword={this.attemptPassword}/>
                    {/* End Password */}
                    {/* Password */}
                    <PasswordInput attemptPassword={this.attemptPassword}/>
                    {/* End Password */}
                </Columns>
            </Column>
        )

    }
}

export default PasswordManager;