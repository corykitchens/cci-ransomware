module.exports = {
  contest_id: 1,
  teams: [],
  flags: [],
  winner_id: null,

  resetCache: () => {
    contest_id = 1;
    contest.teams = [];
    contest.flags = [];
    contest.winner_id = null;
  }
}