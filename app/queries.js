
module.exports = {
  
  getContests: 'select contest_id, event_date, winner_id from contest',
  
  getContestById: 'select contest_id, event_date, winner_id from contest where contest_id = $1',
  
  attemptFlag: 'select flag_id from flag where value=$1',
  
  getTeams: 'select team_id, name from team',
  
  getTeamById: 'select name from team where team_id=$1',
  
  getTeamsFlags: 'select distinct team.team_id, team.name, flag.flag_id, flag.value from team \
                 join team_flag on team.team_id = team_flag.team_id \
                 join flag on team_flag.flag_id = flag.flag_id \
                 WHERE team.team_id = $1'
}