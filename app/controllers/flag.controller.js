const userCache = require('../../config/cache/user.js');
const { queryDb } = require('../../db');
const {
  getTeamFlagCount,
  attemptFlag,
  insertFoundFlag
} = require('../../db/queries.js');


const setUserAsWinner = (token) => {
  userCache[token].winner = true;
}


async function isGameOver(token) {
  const results = await queryDb(getTeamFlagCount, [userCache[token].team_id])
  return results.rows[0].count == userCache.maxFlag;
};


const tokenIsValid = (givenToken) => {
  return userCache.hasOwnProperty(givenToken);
}

async function isValidFlag (flagValue) {
  const results = await queryDb(attemptFlag, [flagValue]);
  if (results.rows.length > 0) {
    return results.rows[0];
  }
  return {};
};

/**
*
* Adds the found flag to the User's cache
*/
const addFlagToUserCache = (flag_id, token, timeStamp, currentTime) => {
  userCache[token].flagsFound[flag_id] = timeStamp;
  userCache[token].lastTimeEvent = currentTime;
};

/**
*
* Inserts found flag to the database
*/
async function persistAttemptToDb(flag_id, token, timeStamp) {
  const results = await queryDb(insertFoundFlag, [userCache[token]['team_id'], flag_id, timeStamp]);
  return results;
};

/**
*
* Tests whether the User has completed the contest
* and 
*/
const prepareResponse = (res, token) => {
  isGameOver(token)
  .then((gameOver) => {
    if (gameOver) {
      setUserAsWinner(token);
    }
    return res.send({message: "correct", gameOver: gameOver});
  })
  .catch((err) => {
    return res.send({message: "correct", gameOver: err});
  })
};


module.exports = {
  attemptFlag: (req, res) => {
    /*
    * TODO
    * Refactor 
    */
    const { flag, token, currentTime } = req.body;
    let timeStamp = new Date();
    if (tokenIsValid(token)) {
      isValidFlag(flag)
      .then((flag) => {
        if (flag.hasOwnProperty('flag_id')) {
          if (userCache[token].flagsFound[flag.flag_id]) {
            return res.send({message: "Password already found"});
          } else {
            addFlagToUserCache(flag.flag_id, token, timeStamp.toUTCString(), currentTime);
            persistAttemptToDb(flag.flag_id, token, timeStamp.toUTCString())
            .then((results) => {
              prepareResponse(res, token);
            })
            .catch((err) => {
              prepareResponse(res, token);
            })
            
          }
        } else {
          res.send({message: "Invalid Attempt"});
        }
      })
      .catch((err) => res.status(401).send(err));
    } else {
      res.status(401).send({message: "Error Token Not Found"});
    }
  },

}
