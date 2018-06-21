const userCache = require('../../config/cache/user.js');
const contestCache = require('../../config/cache/contest.js');
const { handleErrorResponse } = require('./utils.js');

const { queryDb } = require('../../db');
const {
  getTeamFlagCount,
  getFlagByValue,
  getTeamsFlagById,
  insertFoundFlag,
  setTeamAsContestWinner
} = require('../../db/queries.js');


module.exports = {
  attemptFlag: (req, res) => {
    const { teamId } = req.params;
    const { flag, currentTime } = req.body;
    //Set the teams current time in contestCache
    contestCache.setTeamsCurrentTime(teamId, currentTime);
    contestCache.setTeamCurrentAttempts(teamId, 1);
    if (req.user.team_id !== Number(teamId)) {
      handleErrorResponse(res, 401, "You are Unauthorized to send this request");
    } else {
      (async() => {
        // Is it a valid flag?
        const getFlagByValueResults = await queryDb(getFlagByValue, [flag])
        if (getFlagByValueResults.rows.length) {
          const flagId = getFlagByValueResults.rows[0].flag_id
          //Did Team previously find Flag?
          const teamsFlagResults = await queryDb(getTeamsFlagById, [teamId, flagId]);
          // If so, send message
          if (teamsFlagResults.rows.length) {
            res.send({attempt: 0});
          } else {
            // If not, insert into database
            const timeStamp = new Date();
            const foundFlagResults = await queryDb(insertFoundFlag, [teamId, flagId, timeStamp.toUTCString()]);
            // Did Team find Final Flag
            const teamFoundFlagCountResults = await queryDb(getTeamFlagCount, [teamId]);
            if (Number(teamFoundFlagCountResults.rows[0].count) === Number(userCache.maxFlag)) {
              const setContestWinnerResults = await queryDb(setTeamAsContestWinner, [teamId, req.params.contestId]);
              res.send({attempt: 1, gameOver: true});
            } else {
              res.send({attempt: 1, gameOver: false});
            }
          }
        } else {
          res.send({attempt: 0});
        }
      })()
      .catch(e => handleErrorResponse(res, 500, e));
    }
  },

  getTeamFlags: (req, res) => {
    const { contestId, teamId } = req.params;
    (async () => {
      const teamFoundFlagCountResults = await queryDb(getTeamFlagCount, [teamId]);
      if (teamFoundFlagCountResults.rows.length) {
        const { count } = teamFoundFlagCountResults.rows[0];
        const gameOver = Number(count) === userCache.maxFlag;
        const current = contestCache.getTeamsCurrentTime(teamId);
        const numberOfAttempts = contestCache.getTeamsCurrentNumberOfAttempts(teamId);
        console.log(numberOfAttempts);
        res.status(200).send({count: count, gameOver: gameOver, 'currentTime': current, numberOfAttempts: numberOfAttempts});
      } else {
        handleErrorResponse(res, 500, "Error getting Team flag count");
      }
    })()
    .catch(e => handleErrorResponse(res, 500, e));
  }  
}
