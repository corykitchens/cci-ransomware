const expect = require('chai').expect;
const decrementClock = require('../app/controllers/utils.js').decrementClock;

describe('Clock decrementing', () => {
    it('should respond with a fifteen minute decrement', () => {
        let currentTime = '04:59:59';
        let decrementTime = decrementClock(currentTime);
        expect(decrementTime).to.equal('04:44:59');
    });
    it('should zero out if decrementing passed 0:14:59', () => {
        let currentTime = '00:14:59';
        let decrementTime = decrementClock(currentTime);
        expect(decrementTime).to.equal('00:00:00');
    });
})