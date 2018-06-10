const queries = require('./queries.js');
const { query } = require('../db');
const jwt = require('jsonwebtoken');


const userCache = {
  team_id: 1,
  flagsFound: {},
  maxFlag: 6,
}

const tokenIsValid = (givenToken) => {
  if (givenToken && userCache.hasOwnProperty('token')) {
    return givenToken === userCache['token'];
  } else {
    return false;
  }
};

async function isValidFlag (flag_id) {
  const results = await query(queries.attemptFlag, [flag_id]);
  if (results.rows.length > 0) {
    return results.rows[0];
  }
  return {};
}

const addFlagToUserCache = (flag_id, timeStamp) => {
  userCache.flagsFound[flag_id] = timeStamp;
}

const persistAttemptToDb = (flag_id, timeStamp) => {
  query(queries.insertFoundFlag, [userCache['team_id'], flag_id, timeStamp])
  .then((results) => {
    if (results.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  })
  .catch((err) => {
    return err;
  })
}

const isGameOver = (req, res) => {
  query(queries.getTeamFlagCount, [userCache.team_id])
  .then((results) => {
    console.log('Received count');
    console.log(results.rows[0].count);
    return results.rows[0].count === userCache.maxFlag;
  })
  .catch((err) => {
    return err;
  })
}

const prepareResponse = (res) => {
  if (isGameOver) {
    return res.send({message: "Correct", gameOver: true});
  } else {
    return res.send({message: "Correct", gameOver: false});
  }
}

module.exports = {
  
  attemptPassword: (req, res) => {
    return res.status(200).json({message: "Get team by id"});
  },

  auth: (req, res) => {
    const { user } = req;
    if (user) {
      userCache['team_id'] = user.team_id;
      let expire_date = new Date();
      expire_date.setDate(expire_date.getDate() + 7);
      const token = jwt.sign({
        team_id: user.team_id,
        name: user.team,
        exp: parseInt(expire_date.getTime() / 1000)
      }, "Polygondwanaland");
      userCache['token'] = token;
      return res.status(200).json({token});
    } else {
      return res.status(401).json({error: 'Bad Request'});
    }
  },
  getContests: (req, res) => {
    query(queries.getContests, [])
    .then(results => res.status(200).send(results.rows))
    .catch(err => res.send(err));
  },
  getContestById: (req, res) => {
    query(queries.getContestById, [req.params.contestId])
    .then(results => res.status(200).send(results.rows[0]))
    .catch(err => res.send(err));
  },

  endGameLoop: (req, res) => {
    res.send({game_complete: true});
  },

  tokenIsValid: (givenToken) => {
    return givenToken === userCache['token'];
  },

  failedToken: (req, res) => {
    return res.status(401).json({message: 'Invalid Token'});
  },

  attemptFlag: (req, res) => {
    let timeStamp = new Date();
    if (!tokenIsValid(req.body.token)) {
      isValidFlag(req.body.flag)
      .then((flag) => {
        if (flag.hasOwnProperty('flag_id')) {
          if (userCache.flagsFound[flag.flag_id]) {
            return res.send({message: "Password already found"});
          } else {
            addFlagToUserCache(flag.flag_id, timeStamp.toUTCString());
            persistAttemptToDb(flag.flag_id, timeStamp.toUTCString());
            prepareResponse(res);
          }
        } else {
          res.send({message: "Invalid Attempt"});
        }
      })
      .catch((err) => res.status(401).send(err));
    } else {
      res.status(401).send({message: "Error Token Not Found"});
    }
  }
}
