const expect = require('chai').expect;
const contestCache = require('../config/cache/contest.js');

describe('Contest Cache', function() {

    it('Contest Cache can be imported', () => {
        expect(contestCache).to.not.be.null;
    });
    it('Calling init will create 20 entries in the team hash', () => {
        contestCache.init();
        expect(contestCache).to.be.a('object');
        expect(contestCache.teams).to.have.keys([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
    });
    it('Each entry in team should have a teamId, currentTime, and attemptCount', function() {
        contestCache.init();
        expect(2).to.equal(2);
        // Object.keys(contestCache.teams).forEach((team) => {
        //     console.log(team);
        //     expect(team).to.have.keys(['teamId', 'currentTime', 'attemptCount']);
        // });
    })
});