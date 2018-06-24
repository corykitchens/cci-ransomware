const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/auth.controller.js');
const flagController = require('../app/controllers/flag.controller.js');
const contestController = require('../app/controllers/contest.controller.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { queryDb } = require('../db');
const { getUserLevel } = require('../db/queries.js');
const { handleErrorResponse } = require('../app/controllers/utils.js');


const isValidJwt = (req, res, next) => {
  if (req.headers.hasOwnProperty('authorization')) {
    let bearer = req.headers.authorization;
    let token = bearer.split('Bearer ')[1];
    //Probably should of stored secret as process.ENV var
    jwt.verify(token, 'Polygondwanaland', (err, decoded) => {
      if (err) {
        res.status(400).json({data: "Error"});
      }
      if (decoded) {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.send(401).json({error: "Type of request must be from an authenticated user"});
  }
}

const isAdmin = (req, res, next) => {
  (async() => {
    const results = await queryDb(getUserLevel, [req.user.team_id]);
    if (results.rows[0].admin) {
      next();
    } else {
      handleErrorResponse(res, 401, {'message': 'You are Not Authorized for this Request'});
    }
  })()
  .catch(e => handleErrorResponse(res, 500, e))
}

//API testing end point
router.get('/', (req, res) => res.status(200).json({message: 'CCI-Ransomware API'}));
//Authentication endpoint
router.post('/auth', passport.authenticate('local'), authController.authenticate);
//AdminView endpoint
router.get('/contests/:contestId', isValidJwt, isAdmin, contestController.getContestById);
router.post('/contests/:contestId/start', isValidJwt, isAdmin, contestController.startContest);
router.post('/contests/:contestId/stop', isValidJwt, isAdmin, contestController.stopContest);
router.post('/contests/:contestId/status', isValidJwt, isAdmin, contestController.statusContest);
//Team Main / Attempt Flag endpoint
router.get('/contests/:contestId/teams/:teamId/time', isValidJwt, contestController.getTeamTime);
router.get('/contests/:contestId/teams/:teamId/flags', isValidJwt, flagController.getTeamFlags);
router.put('/contests/:contestId/teams/:teamId/flags', isValidJwt, flagController.attemptFlag);

module.exports = router;