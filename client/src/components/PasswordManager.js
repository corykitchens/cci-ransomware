import React, { Component } from 'react';
import Column from './Column';
import Columns from './Columns';
import PasswordInput from './PasswordInput';
import Modal from './Modal';

class PasswordManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
          maxPasswords: 6,
          passwordAttempts: 0,
          correctAttempts: 0,
          incorrectAttempts: 0,
          foundFlags: [],
          modalClasses: '',
          disableInput: true
        }
        this.syncFlagCount = this.syncFlagCount.bind(this);
        this.updateStateWithFlagCount = this.updateStateWithFlagCount.bind(this);
        
        this.disableGame = this.disableGame.bind(this);

        this.attemptPassword = this.attemptPassword.bind(this);
        this.wasAttemptSuccessfull = this.wasAttemptSuccessfull.bind(this);
        this.persistState = this.persistState.bind(this);
        
        this.enableModal = this.enableModal.bind(this);
        this.disableModal = this.disableModal.bind(this);

        this.pullTeamState = this.pullTeamState.bind(this);
        this.updateClock = this.updateClock.bind(this);
    }

    componentWillMount() {
      
    }

    componentDidMount() {
      if (localStorage.getItem('token')) {
        this.setState({token: localStorage.getItem('token')});
      }
      if (localStorage.getItem('teamId')) {
        this.setState({teamId: localStorage.getItem('teamId')});
        this.syncFlagCount();
      }
      this.intervalId = setInterval(this.pullTeamState, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.intervalId);
    }

    updateClock(currentTime, status) {
      if (status === 'Clock Started') {
        if (this.state.disableInput) {
          this.setState({disableInput: false})
        }
      }

      if (status === 'Clock Stopped') {
        if (!this.state.disableInput) {
          this.setState({disableInput: true});
        }
      }
      if (currentTime) {
        this.props.updateClock(currentTime);
      }
    }

    syncFlagCount() {
      let teamId = localStorage.getItem('teamId');
      let token = localStorage.getItem('token');
      fetch(`/api/contests/1/teams/${teamId}/flags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(resp => resp.json())
      .then(resp => this.updateStateWithFlagCount(resp))
      .catch(error => console.log(error));
    }

    updateStateWithFlagCount(data) {
      const { count, gameOver, numberOfAttempts, currentTime } = data;
      
      if (gameOver || currentTime === '00:00:00') {
       this.disableGame();
      }

      if (Number(count) === this.state.maxPasswords && gameOver) {
        // this.setState({modalText: 'Game Complete!'});
        // this.setState({disableInput: true});
        // this.props.gameCompleted();
        // this.enableModal();
        this.disableGame();
      } else {
        this.props.updateClock(currentTime);
        this.setState({correctAttempts: Number(count)});
        this.setState({passwordAttempts: Number(numberOfAttempts)});
      }
    }

    disableGame() {
    clearInterval(this.intervalId);
     this.setState({modalText: 'Game Over!'});
     this.setState({disableInput: true});
     this.props.gameCompleted();
     this.enableModal();
    }

    pullTeamState() {
      let teamId = localStorage.getItem('teamId');
      fetch(`/api/contests/1/teams/${teamId}/time`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.token}`
        },
      })
      .then(resp => resp.json())
      .then(resp => this.updateClock(resp.currentTime, resp.status))
      .catch(error => console.log(error));
    }

    attemptPassword(data) {
      fetch(`/api/contests/1/teams/${this.state.teamId}/flags`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
          flag: data,
          currentTime: localStorage.getItem('current').split(' ')[4]
        })
      })
      .then(resp => resp.json())
      .then(resp => this.wasAttemptSuccessfull(resp))
      .catch(error => console.log(error));

      this.setState({ passwordAttempts: this.state.passwordAttempts+1});
      localStorage.setItem('passwordAttemptCount', this.state.passwordAttempts);
    }

    wasAttemptSuccessfull(resp) {
      const { attempt, gameOver, currentTime } = resp;
      //If attempt was correct
      if (attempt) {
        this.setState({ correctAttempts: Number(this.state.correctAttempts) + 1});
        this.persistState();
        this.setState({modalText: 'Correct!'});
        this.enableModal();
      } 
      //No it was not, state Incorrect
      else {
        this.setState({modalClasses: 'is-active'});
        this.props.updateClock(currentTime);
        this.setState({modalText: 'Incorrect!'});
        this.enableModal();
      }
      if (gameOver || currentTime === '00:00:00') {
        this.disableGame(); 
        // this.setState({modalText: 'Game Complete!'});
        // this.setState({disableInput: true});
        // this.props.gameCompleted();
        // this.enableModal();
      }
    }

    persistState() {
      localStorage.setItem('correctAttempts', this.state.correctAttempts);
    }

    enableModal() {
      this.setState({modalClasses: 'is-active'});
    }

    disableModal() {
      this.setState({modalClasses: ''});
    }

    render() {
      return (
        <Column>
          <Columns>
            <PasswordInput placeholder="Attempt Password" attemptPassword={this.attemptPassword} disabled={this.state.disableInput}/>
          </Columns>
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
        <Modal classNames={this.state.modalClasses} disableModal={this.disableModal} modalText={this.state.modalText}/>
        </Column>
      )
    }
}

export default PasswordManager;