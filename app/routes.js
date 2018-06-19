const express = require('express');
const router = express.Router();
const controller = require('./controller.js');
const passport = require('passport');


router.get('/', (req, res) => res.status(200).json({message: 'CCI-Ransomware API'}));
// Login Route
router.post('/auth', passport.authenticate('local'), controller.auth);
// Attempt a Password
router.put('/flag', controller.attemptFlag)
// Admin
router.get('/contests/:contestId', controller.getContestById);

router.get('/contests/:contestId/status', controller.getContestStatus);

module.exports = router;