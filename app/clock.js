const contestCache = require('../config/cache/contest.js');
const moment = require('moment');

class TestClock {

  constructor() {
    contestCache.init();
    this.printTeamTimes = this.printTeamTimes.bind(this);
    this.debug = this.debug.bind(this);
  }

  printTeamTimes() {
    Object.keys(contestCache.teams).forEach((teamId) => {
      console.log(`Team ${teamId} - Time ${contestCache.teams[teamId].currentTime}`);
    })
  }

  debug() {
    setInterval(this.printTeamTimes, 1000);
  }
}


function Clock() {

  this.subtractTimeByOneSecond = function(team) {
    const currentTimeAsDateObj = moment(`2018-06-23 ${team.currentTime}`);
    const subtractedTimeAsDateObj = currentTimeAsDateObj.subtract(1, 'seconds');
    const currentHour = subtractedTimeAsDateObj.get('hour');
    
    if (currentHour <= 23 && currentHour >= 6) {
        team.currentTime = '00:00:00';
    } else {
        team.currentTime = subtractedTimeAsDateObj.format('HH:mm:ss')
    }
  }

  this.decrementTime = function() {
    const self = this;
    Object.keys(contestCache.teams).forEach((teamId) => {
      self.subtractTimeByOneSecond(contestCache.teams[teamId]);
    });
  }.bind(this);

  this.tick = function() {
    this.intervalId = setInterval(this.decrementTime, 1000);
  }
}



module.exports = new Clock();