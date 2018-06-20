const { queryDb } = require('../db');
const { auth } = require('../db/queries.js');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  passport.use(new LocalStrategy((name, password, cb) => {
    queryDb(auth, [name])
    .then((results) => {
      if (results.rows.length > 0) {
        const team = results.rows[0];
        //TODO
        //Use bcrpt.compare
        //Dont store password as plaintext
        if (team.password === password) {
          return cb(null, team);
        } else {
          return cb('Invalid credentials', null);
        }
      } else {
        return cb('Invalid credentials', null);
      }
    })
    .catch((err) => {
      console.log(err);
      return cb(err, null)
    });
  }));

  passport.serializeUser((team, done) => {
    done(null, team.name);
  });

  passport.deserializeUser((name, cb) => {
    queryDb(auth, [name])
    .then((results) => {
      return cb(null, results.rows[0]);
    })
    .catch((err) => {
      return cb(err, null);
    });
  });
}