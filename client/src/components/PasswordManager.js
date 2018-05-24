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
          passwords: ['hello', 'password123', 'qwerty', 'letmein', 'abc123', 'mypassword'],
          inputs: [
            {
                "key": "a",
                "disabled": false,
                "placeholder": "Password 1"
            },
            {
                "key": "b",
                "disabled": true,
                "placeholder": "Password 2"
            },
            {
                "key": "c",
                "disabled": true,
                "placeholder": "Password 3"
            },
            {
                "key": "d",
                "disabled": true,
                "placeholder": "Password 4"
            },
            {
                "key": "e",
                "disabled": true,
                "placeholder": "Password 5"
            },
            {
                "key": "f",
                "disabled": true,
                "placeholder": "Password 6"
            },
          ]
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
                    {this.state.inputs.slice(0, 2).map((i) => {
                        return (
                            <PasswordInput key={i.key} 
                                           placeholder={i.placeholder} 
                                           disabled={i.disabled} 
                                           attemptPassword={this.attemptPassword} />
                        )    
                    })}
                </Columns>
                <Columns>
                    {this.state.inputs.slice(2, 4).map((i) => {
                        return (
                            <PasswordInput key={i.key} 
                                           placeholder={i.placeholder} 
                                           disabled={i.disabled} 
                                           attemptPassword={this.attemptPassword} />
                        )    
                    })}
                </Columns>
                <Columns>
                    {this.state.inputs.slice(4, 6).map((i) => {
                        return (
                            <PasswordInput key={i.key} 
                                           placeholder={i.placeholder} 
                                           disabled={i.disabled} 
                                           attemptPassword={this.attemptPassword} />
                        )    
                    })}
                </Columns>
                <a class="button is-info is-rounded submit-btn">Submit Password Attempt</a>

                {/* Debug Mode */}
                <Columns>
                  <Column>
                  <h2>Debug Mode</h2>
                  <h3>Found Passwords: {this.state.correctAttempts}</h3>
                  </Column>
                </Columns>
                {/* End Debug Mode*/}
            </Column>
        )

    }
}

export default PasswordManager;