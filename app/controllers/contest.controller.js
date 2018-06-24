const contestCache = require('../models/contest.js');
const clock = require('../models/clock.js');
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
    t.flags = {};
    for (let i = 1; i <= 6; i++) {
      t.flags[i] = 0;
    }

    contestFlags.forEach((flag) => {
      if (flag.team_id == t.team_id) {
        t.flags[flag.flag_id] = 1;
      }
    });

    if (contestCache.teams.hasOwnProperty(t.team_id)) {
      t.timeRemaining = contestCache.getTeamsCurrentTime(t.team_id);
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
  },

  startContest: (req, res) => {
    clock.tick();
    if (clock.status) {
      res.status(200).json({status: clock.status});
    } else {
      res.status(500).json({status: clock.status});
    }
  },

  stopContest: (req, res) => {
    clock.stop();
    if (clock.status) {
      res.status(200).json({status: clock.status});
    } else {
      res.status(500).json({status: clock.status});
    }
  },

  statusContest: (req, res) => {
    if (clock.status) {
      res.status(200).json({status: clock.status});
    } else {
      res.status(200).json({});
    }
  },

  getTeamTime: (req, res) => {
    const { teamId } = req.params;
    let status = 'Clock Stopped';
    if (clock.status) {
      status = clock.status;
    }
    res.status(200).send({currentTime: contestCache.teams[teamId].currentTime, status: status});
  }
}