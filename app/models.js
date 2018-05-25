const mongoose = require('mongoose');

// A team will consist of a team name
// and a password for authentication
// One-to-many relationship between the team
// and cracked_passwords
// TODO - store hashed passwords not plaintext
const teamSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  password: String,
  cracked_passwords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Password'
    }
  ],
});

// A passwor will consist of a single value
// 
const passwordSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: String
});

//Contest
//A contest will consist of many teams
//and many passwords
const contestSchema = mongoose.Schema({
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    }
  ],
  passwords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Password'
    }
  ]
})

module.exports = {
  'Team': mongoose.model('Team', teamSchema),
  'Password': mongoose.model('Password', passwordSchema),
  'Contest': mongoose.model('Contest', contestSchema)
}