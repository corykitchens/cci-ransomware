const expect = require('chai').expect;
const contestCache = require('../config/cache/contest.js');
const decrementClock = require('../app/controllers/utils.js').decrementClock;
const clock = require('../app/clock.js');

describe('Countdown Timer', () => {
  it('teams should be initialized with 04:59:59', () => {
    contestCache.init();
    Object.keys(contestCache.teams).forEach((teamId) => {
      expect(contestCache.teams[teamId].currentTime).to.equal('04:59:59');
    });
  });
  
  it('should decrement a teams time by one second', () => {
    clock.subtractTimeByOneSecond(contestCache.teams['1']);
    expect(contestCache.teams['1'].currentTime).to.equal('04:59:58');
  });

  it('should decrement all of the teams time by one second, but not coerce previous times', () => {
    clock.decrementTime();
    Object.keys(contestCache.teams).forEach((teamId) => {
      if (teamId === '1') {
        expect(contestCache.teams[teamId].currentTime).to.equal('04:59:57');
      } else {
        expect(contestCache.teams[teamId].currentTime).to.equal('04:59:58');
      }
    });
  });

  it('should not overwrite teams that have time penalities', () => {
    contestCache.teams['1'].currentTime = decrementClock(contestCache.teams['1'].currentTime);
    clock.decrementTime();
    Object.keys(contestCache.teams).forEach((teamId) => {
      if (teamId === '1') {
        expect(contestCache.teams[teamId].currentTime).to.equal('04:44:56');
      } else {
        expect(contestCache.teams[teamId].currentTime).to.equal('04:59:57');
      }
    });
  })
})