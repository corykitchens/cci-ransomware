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
    this.teams[teamId] = {};
    this.teams[teamId]
  },

  getTeamsCurrentTime: function(teamId) {
    return this.teams[teamId].currentTime;
  },

  getAllTeamsCurrentTime: function() {
    return Object.keys(this.teams).map((teamId) => {
        return {
            teamId: this.teams[teamId].currentTime
        }
    });
  }
}