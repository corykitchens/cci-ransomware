import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../components/Container';
import Column from '../components/Column';
import Columns from '../components/Columns';
import Title from '../components/Title';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import AdminModal from '../components/AdminModal';

class AdminView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'CCI Ransomware | Admin',
      timerStarted: false,
      contest: {
        contest_id: 1,
        winner_id: null,
        teams: [],
        flags: [
          {
            id: 1,
            key: 'I'
          },
          {
            id: 2,
            key: 'II'
          },
          {
            id: 3,
            key: 'III'
          },
          {
            id: 4,
            key: 'IV'
          },
          {
            id: 5,
            key: 'V'
          },
          {
            id: 6,
            key: 'VI'
          },
        ]
      },
    };

    this.getRand = this.getRand.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setTableSchema = this.setTableSchema.bind(this);
    this.updateWinner = this.updateWinner.bind(this);
    this.startTimer = this.startTimer.bind(this);

    this.enableModal = this.enableModal.bind(this);
    this.disableModal = this.disableModal.bind(this);

    this.initStartTimer = this.initStartTimer.bind(this);
    this.initPauseTimer = this.initPauseTimer.bind(this);

    this.pauseTimer = this.pauseTimer.bind(this);
    this.beginTimer = this.beginTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentWillMount() {
    this.setTableSchema();
    if (localStorage.getItem('token')) {
      this.setState({token: localStorage.getItem('token')});
    }
  }

  componentDidMount() {
    if (this.state.token) {
      this.intervalId = setInterval(this.fetchData, 1000);
      
    }
  }

  initStartTimer() {
    this.setState({modalText: 'Are you sure you want to begin the Timer?',
                   modalTitle: 'Start Timer'});
    this.enableModal();
  }

  initPauseTimer() {
    this.setState({modalText: 'Are you sure you want to pause the Timer?',
                   modalTitle: 'Pause Timer'});
    this.enableModal();
  }

  enableModal() {
    this.setState({modalClasses: 'is-active'});
  }

  disableModal() {
    this.setState({modalClasses: ''});
  }

  beginTimer(e) {
    this.disableModal();
    this.startTimer();
  }

  pauseTimer(e) {
    e.preventDefault();
    this.disableModal();
    this.stopTimer();
  }

  stopTimer() {
    fetch('/api/contests/1/stop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.token}`
      }
    })
    .then(resp => resp.json())
    .then(respAsJson => console.log(respAsJson))
    .catch(err => console.log(err));
    this.setState({timerStarted: false});
  }

  startTimer() {
    fetch('/api/contests/1/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.token}`
      }
    })
    .then(resp => resp.json())
    .then(respAsJson => console.log(respAsJson))
    .catch(err => console.log(err));
    this.setState({timerStarted: true});
  }

  fetchData() {
    fetch('/api/contests/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.token}`
      }
    })
    .then(resp => resp.json())
    .then(contestStatus => {
      this.setState({contest: contestStatus.contest});
      this.updateWinner();
    })
    .catch(err => {
      console.log(err);
    });
  }

  setTableSchema() {
    let cols = this.state.contest.flags.map(flag => flag.key);
    cols.unshift('Flags');
    cols.push('Time Remaining');
    cols.push('Winner?');
    this.setState({cols: cols});
  }

  getRand() {
    return Math.floor(Math.random() * Math.floor(2));;
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  updateWinner() {
    // TODO
    // Refactor
    if (this.state.contest.winner_id !== null) {
      const teams = this.state.contest.teams;
      let tempTeam = teams[this.state.contest.winner_id-1]
      tempTeam.isWinner = 'Winner!';
      teams[this.state.contest.winner_id-1] = tempTeam;
      this.setState({teams});
      console.log(this.state.contest.teams);
    }
  }

  render() {
    if (!localStorage.getItem('token') && !localStorage.getItem('isAdmin')) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <Navbar />
        <Container>
          <Columns>
            <Column>
              <div className="box has-text-centered">
                { !this.state.timerStarted ? <button className="button is-link is-large" onClick={this.initStartTimer}>Start Timer</button> : null }
                { this.state.timerStarted ? <button className="button is-primary is-large" onClick={this.initPauseTimer}>Pause Timer</button> : null }
              </div>
              <Card className="card-container">
                <Title title={this.state.title} classes={'title has-text-danger has-text-centered'}/>
                {this.props.isAdmin}
                {/*
                  <Table cols=this.state.cols rows=this.state.rows />
                */}
                <table className="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      {this.state.cols.map((col) => {
                        return (
                          <td>
                            <strong>{col}</strong>
                          </td>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.contest.teams.map((team) => {
                      if (!team.admin) {
                        return (
                          <tr>
                            <td>
                              {team.name}
                            </td>
                            {Object.keys(team.flags).map((k) => {
                              return (
                                <td className={["flag", team.flags[k]].join('')}>

                                </td>
                              )
                            })}
                            <td>
                              {team.timeRemaining}
                            </td>
                            <td>
                              {team.isWinner}
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </table>
              </Card>
            </Column>
          </Columns>
        </Container>
        <AdminModal title={this.state.modalTitle} timerStarted={this.state.timerStarted} classNames={this.state.modalClasses} disableModal={this.disableModal} modalText={this.state.modalText} beginTimer={this.beginTimer} pauseTimer={this.pauseTimer} />
      </div>
    )
  }
}

export default AdminView;