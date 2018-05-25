const expect = require('chai').expect;
const Team = require('../app/models.js').Team;

describe('Team Model', () => {
  before(() => {
  })
  // Test instantiation
  it('should instantiate a new instance of Team', (done) => {
    const t = new Team({name: 'Blue Baracuda', password: 'helloworld'})
    t.save(() => {
      console.log(t.name);
      expect(t.name).to.equal('Blue Baracuda');
      expect(t.password).to.equal('helloworld');
      done();
    });
  });
  //TODOS
  // Test querying all teams
  // Test querying by name
  // Test updating Team
  // Test deleting Team
  // Test hashing of password
});