const express = require('express');
const router = express.Router();
const controller = require('./controller.js');
const passport = require('passport');

// Login Route
router.post('auth', passport.authenticate('local'), controller.auth);
// Attempt a Password
router.put('flag', controller.attemptFlag)
// Admin
router.get('/contests/:contestId', controller.getContestById);

module.exports = router;