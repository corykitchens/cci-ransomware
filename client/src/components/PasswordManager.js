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
          foundFlags: [],
          modalClasses: ''
        }
        this.attemptPassword = this.attemptPassword.bind(this);
        this.persistState = this.persistState.bind(this);
        this.enableModal = this.enableModal.bind(this);
        this.disableModal = this.disableModal.bind(this);
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
        this.state.foundFlags.push(data);
        passwords.splice(idx, 1);
        this.setState({ correctAttempts: ++this.state.correctAttempts});
        this.setState({foundFlags: this.state.foundFlags});
        this.setState({passwords: passwords});
        this.persistState();
        this.setState({modalText: 'Correct!'});
        this.enableModal();
        if (this.state.passwords.length === 0) {
          this.setState({modalText: 'Game Complete!'});
          this.props.gameCompleted();
          this.enableModal();
        }
      } else {
        this.setState({ incorrectAttempts: ++this.state.incorrectAttempts});
        this.setState({modalClasses: 'is-active'});
        this.props.decrementClock();
        this.setState({modalText: 'Incorrect!'});
        this.enableModal();
      }
      this.setState({ passwordAttempts: ++this.state.passwordAttempts});
    }

    persistState() {
      localStorage.setItem('foundFlags', this.state.foundFlags);
      localStorage.setItem('correctAttempts', this.state.correctAttempts);
    }

    enableModal() {
      this.setState({modalClasses: 'is-active'});
    }

    disableModal() {
      this.setState({modalClasses: ''});
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
                  <Column>
                    <div className="content debug-container">
                      <h2>Debug Mode</h2>
                      <div className="content">
                        <table className="table">
                          <thead>
                            <tr>
                              <td>Password Attempts</td>
                              <td>Correct Attempts</td>
                              <td>Incorrect Attempts</td>
                              <td>Passwords</td>
                              <td>Found Flags</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{this.state.passwordAttempts}</td>
                              <td>{this.state.correctAttempts}</td>
                              <td>{this.state.incorrectAttempts}</td>
                              <td>{this.state.passwords.join(',')}</td>
                              <td>{this.state.foundFlags.join(',')}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Column>
                </Columns>
                {/* End Debug Mode*/}
                <Modal classNames={this.state.modalClasses} disableModal={this.disableModal} modalText={this.state.modalText}/>
            </Column>
        )

    }
}

export default PasswordManager;