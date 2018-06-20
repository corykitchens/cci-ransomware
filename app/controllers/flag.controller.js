const userCache = require('../../config/cache/user.js');
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
            res.send({message: "Flag found previously"});
          } else {
            // If not, insert into database
            const timeStamp = new Date();
            const foundFlagResults = await queryDb(insertFoundFlag, [teamId, flagId, timeStamp.toUTCString()]);
            // Did Team find Final Flag
            const teamFoundFlagCountResults = await queryDb(getTeamFlagCount, [teamId]);
            if (Number(teamFoundFlagCountResults.rows[0].count) === Number(userCache.maxFlag)) {
              const setContestWinnerResults = await queryDb(setTeamAsContestWinner, [teamId, req.params.contestId]);
              res.send({message: 'correct', gameOver: true});
            } else {
              res.send({message: 'correct', gameOver: false});
            }
          }
        } else {
          res.send({data: "Invalid"});
        }
      })()
      .catch(e => handleErrorResponse(res, 500, e));
      
    }
  }
  
}
