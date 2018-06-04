const queries = require('./queries.js');
const { query } = require('../db');

const isValidFlag = (result) => {
  return result.hasOwnProperty('flag_id');
}

module.exports = {
  attemptPassword: (req, res) => {
    return res.status(200).json({message: "Get team by id"});
  },

  auth: (req, res) => {
    return res.status(200).json({message: "Auth"});
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
  attemptFlag: (req, res) => {
    query(queries.attemptFlag, [req.body.flag])
    .then(results => isValidFlag(results.rows[0]) ? res.send({message: 'Attempt Successul'}) : res.send({message: 'Incorrect Attempt'}))
    .catch(err => res.send(err))
  }
}
