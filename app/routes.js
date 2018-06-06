const express = require('express');
const router = express.Router();
const controller = require('./controller.js');
const passport = require('passport');

// Login Route
router.post('/api/auth', passport.authenticate('local'), controller.auth);

// Attempt a Password
router.post('/api/contests/:contestid/teams/:teamid/attempt', controller.attemptPassword);

router.get('/api/contests', controller.getContests);
router.get('/api/contests/:contestId', controller.getContestById);

router.put('/api/flag', controller.attemptFlag)

module.exports = router;