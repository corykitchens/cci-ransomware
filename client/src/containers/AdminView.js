import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../components/Container';
import Column from '../components/Column';
import Columns from '../components/Columns';
import Title from '../components/Title';
import Card from '../components/Card';
import Table from '../components/Table';


class AdminView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contest: {
        contest_id: 1,
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
      teams: [],
      title: 'CCI Ransomware | Admin'
    };

    this.getRand = this.getRand.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setTableSchema = this.setTableSchema.bind(this);
  }

  fetchData() {
    fetch('/api/contests/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(teams => {
      this.setState({teams: teams});
    })
    .catch(err => {
      console.log(err);
    });
  }

  setTableSchema() {
    let cols = this.state.contest.flags.map(flag => flag.key);
    cols.push('Time Remaining');
    cols.push('Game Over?');
    cols.push('Winner?');
    this.setState({cols: cols});
  }

  componentDidMount() {
    this.intervalId = setInterval(this.fetchData, 1000);
  }


  getRand() {
    return Math.floor(Math.random() * Math.floor(2));;
  }

  componentWillMount() {
    this.fetchData();
    this.setTableSchema();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    if (!localStorage.getItem('token') && !localStorage.getItem('isAdmin')) {
      return <Redirect to='/' />
    }
    return (
        <Container>
          <Columns>
            <Column>
              <Card className="card-container">
                <Title title={this.state.title} classes={'title has-text-danger has-text-centered'}/>
                {this.props.isAdmin}
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
                    {this.state.teams.map((team) => {
                      return (
                        <tr>
                          <td>
                            {team.name}
                          </td>
                          {Object.keys(team.flags).map((k) => {
                            return (
                              <td className={["flag", team.flags[k]].join('')}>
                                {k}
                              </td>
                            )
                          })}
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
    )
  }
}

export default AdminView;