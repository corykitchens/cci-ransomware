const contestCache = require('../../config/cache/contest.js');
const { handleErrorResponse } = require('./utils.js');
const { queryDb } = require('../../db');
const {
  getAllTeams,
  getContestById,
  getTeamsByContest, 
  getFlagsByContest,
  getFoundFlagsByAllTeams 
} = require('../../db/queries.js');


const buildContestStatusStructure = (teams, contestFlags) => {
  //for each team
  let res = teams.map((t) => {
    //set their flags map
    t.flags = {};
    for (let i = 1; i <= 6; i++) {
      t.flags[i] = 0;
    }
    contestFlags.forEach((d) => {
      t.flags[d.flag_id] = d.team_id == t.team_id ? 1 : 0;
    })
    if (contestCache.teams.hasOwnProperty(t.team_id)) {
      t.timeRemaining = contestCache.getTeamsCurrentTime(t.team_id);
    } else {
      t.timeRemaining = '04:59:59';
    }
    return t;
  })
  return res;
}


module.exports = {
  
  getContestById: (req, res) => {
    (async() => {
      const data = {};
      const contestResults = await queryDb(getContestById, [req.params.contestId]);
      data.contest = contestResults.rows[0];

      const teamResults = await queryDb(getAllTeams, []);
      data.contest.teams = teamResults.rows;
      
      const flagResults = await queryDb(getFlagsByContest, [data.contest.contest_id]);
      data.contest.flags = flagResults.rows;

      const foundFlagResults = await queryDb(getFoundFlagsByAllTeams, []);
      const foundFlags = foundFlagResults.rows;
      buildContestStatusStructure(data.contest.teams, foundFlags);

      res.json(data);
    })()
    .catch(e => handleErrorResponse(e));
  }

}