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
        this.wasAttemptSuccessfull = this.wasAttemptSuccessfull.bind(this);
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

    wasAttemptSuccessfull(resp) {
      if (resp.message === 'Attempt Successul') {
        this.setState({ correctAttempts: ++this.state.correctAttempts});
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

    }
    attemptPassword(data) {
      fetch('/api/flag', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          flag: data,
        })
      })
      .then(resp => resp.json())
      .then(resp => this.wasAttemptSuccessfull(resp))
      .catch(error => console.log(error));

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
                    <div className="content">
                      <div className="content">
                        <table className="table">
                          <thead>
                            <tr>
                              <td>Flag Attempts</td>
                              <td>Found Flags</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{this.state.passwordAttempts}</td>
                              <td>{this.state.correctAttempts}</td>
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