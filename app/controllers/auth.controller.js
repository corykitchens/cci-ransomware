const jwt = require('jsonwebtoken');
const userCache = require('../../config/cache/user.js');


module.exports =  {
  authenticate: (req, res) => {
    const { user } = req;
    if (user) {
      let expire_date = new Date();
      expire_date.setDate(expire_date.getDate() + 7);
      const token = jwt.sign({
        team_id: user.team_id,
        name: user.team,
        exp: parseInt(expire_date.getTime() / 1000)
      }, "Polygondwanaland");
      // userCache[user.team_id]['token'] = token;
      userCache[token] = user;
      userCache[token].flagsFound = {};
      if (user.admin) {
        return res.status(200).json({token: token, team_id: user.team_id, isAdmin: user.admin});
      } else {
        return res.status(200).json({token: token, team_id: user.team_id });
      }
    } else {
      return res.status(401).json({error: 'Bad Request'});
    }
  }
};