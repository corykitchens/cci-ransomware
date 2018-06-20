import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../components/Container';
import Column from '../components/Column';
import Columns from '../components/Columns';
import Title from '../components/Title';
import Card from '../components/Card';
import Table from '../components/Table';
import Navbar from '../components/Navbar';

class AdminView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'CCI Ransomware | Admin',
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
    cols.push('Game Over?');
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
                            {team.gameOver}
                          </td>
                          <td>
                            {team.isWinner}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Card>
            </Column>
          </Columns>
        </Container>
      </div>
    )
  }
}

export default AdminView;