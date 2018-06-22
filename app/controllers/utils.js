const moment = require('moment');

module.exports.handleErrorResponse = (res, statusCode, err) => {
  res.status(statusCode).json(err);
};


module.exports.decrementClock = (currentTime) => {
    const currentTimeAsDateObj = moment(`2018-06-23 ${currentTime}`);
    const subtractedTimeAsDateObj = currentTimeAsDateObj.subtract(15, 'minutes');
    const currentHour = subtractedTimeAsDateObj.get('hour');
    
    if (currentHour <= 23 && currentHour >= 6) {
        return '00:00:00';
    } else {
        return subtractedTimeAsDateObj.format('HH:mm:ss')
    }
}