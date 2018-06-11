import React, { Component } from 'react';


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
      teams: []
    };

    this.getRand = this.getRand.bind(this);
    this.fetchData = this.fetchData.bind(this);
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

  componentDidMount() {
    this.intervalId = setInterval(this.fetchData, 1000);
  }


  getRand() {
    return Math.floor(Math.random() * Math.floor(2));;
  }

  componentWillMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <h1 className="title">Admin</h1>
        <table className="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <td>
                <strong>Flags</strong>
              </td>
              {this.state.contest.flags.map((flag) => {
                return (
                  <td>
                    <strong>{flag.id}. Flag {flag.key}</strong>
                  </td>
                )
              })}
              <td>
                <strong>Game Over?</strong>
              </td>
              <td>
                <strong>Winner?</strong>
              </td>
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
      </div>
    )
  }
}

export default AdminView;