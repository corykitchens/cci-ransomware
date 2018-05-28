import React, { Component } from 'react';
import Column from './Column';
import Columns from './Columns';
import PasswordInput from './PasswordInput';
import Modal from './Modal';

class PasswordManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
          passwordAttempts: 0,
          correctAttempts: 0,
          incorrectAttempts: 0,
          passwords: ['hello', 'password123', 'qwerty', 'letmein', 'abc123', 'mypassword'],
          foundFlags: []
        }
        this.attemptPassword = this.attemptPassword.bind(this);
        this.persistState = this.persistState.bind(this);
    }

    componentWillMount() {
      if (localStorage.getItem('foundFlags')) {
        localStorage.getItem('foundFlags').split(',').map((p) => {
          this.state.foundFlags.push(p);
        });
        this.setState({foundFlags: this.state.foundFlags});
      }
      if (localStorage.getItem('correctAttempts')) {
        this.setState({correctAttempts: localStorage.getItem('correctAttempts')});
      }
      this.state.foundFlags.forEach((e) => {
        let idx = this.state.passwords.indexOf(e);
        if (idx > -1) {
          this.state.passwords.splice(idx, 1);
          this.setState({passwords: this.state.passwords});
        }
      });
    }

    attemptPassword(data) {
      let idx = this.state.passwords.indexOf(data);
      if (idx > -1) {
        const { foundFlags, passwords } = this.state;
        foundFlags.push(data);
        passwords.splice(idx, 1);
        this.setState({ correctAttempts: ++this.state.correctAttempts});
        this.setState({foundFlags: foundFlags});
        this.setState({passwords: passwords});
        this.persistState();
        if (this.state.passwords.length === 0) {
          alert('Game complete');
        }
      } else {
        this.setState({ incorrectAttempts: ++this.state.incorrectAttempts});
        this.setState({modalClasses: 'is-active'});
      }
      this.setState({ passwordAttempts: ++this.state.passwordAttempts});
    }

    persistState() {
      localStorage.setItem('foundFlags', this.state.foundFlags);
      localStorage.setItem('correctAttempts', this.state.correctAttempts);
    }

    render() {
      const { foundFlags } = this.state;
        return (
            <Column>
                <Columns>
                    <PasswordInput placeholder="Attempt Password" attemptPassword={this.attemptPassword} />
                </Columns>
                {/* Debug Mode */}
                <Columns>
                  <Modal props={this.state.modalClasses} />
                  <Column>
                    <h2>Debug Mode</h2>
                    <div className="content">
                      Found Passwords: {this.state.correctAttempts}
                    </div>
                    <div className="content">
                      Password Attempts: {this.state.passwordAttempts}
                    </div>
                    <div className="content">
                      Correct Attempts: {this.state.correctAttempts}
                    </div>
                    <div className="content">
                      Incorrect Attempts: {this.state.incorrectAttempts}
                    </div>
                    <div className="content">
                      Passwords: {this.state.passwords.join(',')}
                    </div>
                    <div className="content">
                      Found Flags: {this.state.foundFlags}
                    </div>
                  </Column>
                </Columns>
                {/* End Debug Mode*/}
            </Column>
        )

    }
}

export default PasswordManager;