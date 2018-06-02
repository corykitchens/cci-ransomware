const express = require('express');
const router = express.Router();

// Login Route
router.post('/api/auth', (req, res) => {
  // req.params.username
  // req.params.password
  res.status(200).json({data: req});
});

// Attempt a Password
router.post('/api/contests/:contestid/teams/:teamid/attempt', (req, res) => {
  res.status(200).json({data: "Attempt a password"});
});

module.exports = router;