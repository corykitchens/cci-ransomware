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
    // 
  }

  componentDidMount() {
    // this.intervalId = setInterval(this.fetchData, 1000);
  }


  getRand() {
    return Math.floor(Math.random() * Math.floor(2));;
  }

  componentWillMount() {
    let teams = [];
    for (let i = 0; i < 20; i++) {
      let team = {};
      team.id = i+1;
      team.name = 'Team ' + (i+1);
      team.flags = {
        'I': this.getRand(),
        'II': this.getRand(),
        'III': this.getRand(),
        'IV': this.getRand(),
        'V': this.getRand(),
        'VI': this.getRand(),
      };
      team.gameOver = 0;
      team.isWinner = 0;
      teams.push(team);
      // this.setState({teams: this.state.teams.push(team)});
    }
    this.setState({teams: teams});
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