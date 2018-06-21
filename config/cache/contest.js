function Team(teamId) {
  this.teamId = teamId;
  this.attemptCount = 0;
}

module.exports = {
  contest_id: 1,
  teams: {},
  flags: [],
  winner_id: null,

  resetCache: function() {
    contest_id = 1;
    teams = {};
    flags = [];
    winner_id = null;
  },

  setTeamsCurrentTime: function(teamId, currentTime) {
    if (!this.teams.hasOwnProperty(teamId)) {
      this.setTeam(teamId);
    }
    this.teams[teamId].currentTime = currentTime;
  },
  
  setTeam: function(teamId) {
    const team = new Team(teamId);
    this.teams[team.teamId] = team;
  },

  setTeamCurrentAttempts: function(teamId, count=0) {
    if (!this.teams[teamId].hasOwnProperty('attemptCount')) {
      this.teams[teamId].attemptCount = 0;
    }
    this.teams[teamId].attemptCount = this.teams[teamId].attemptCount + count;
  },

  getTeamsCurrentTime: function(teamId) {
    console.log('Got teamId ' + teamId);
    console.log(this.teams);
    if (!this.teams.hasOwnProperty(teamId)) {
      this.setTeam(teamId);
      this.setTeamsCurrentTime(teamId, '04:59:59');
      console.log(this.teams);
    }
    console.log(this.teams[teamId].currentTime);
    return this.teams[teamId].currentTime;
  },
  getAllTeamsCurrentTime: function() {
    return Object.keys(this.teams).map((teamId) => {
        return {
            teamId: this.teams[teamId].currentTime
        }
    });
  },

  getTeamsCurrentNumberOfAttempts: function(teamId) {
    if (!this.teams.hasOwnProperty(teamId)) {
      this.setTeam(teamId);
    }
    return this.teams[teamId].attemptCount;
  }
}