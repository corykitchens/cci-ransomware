import React, { Component } from 'react';
import moment from 'moment';


class CountdownClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: '04:59:59',
      floor: '00:00:00',
      ceiling: '23:58:58',
      modifier: 1000,
      countdownComplete: false
    }
    this.decrementTime = this.decrementTime.bind(this);
    this.checkIfCountdownCompleted = this.checkIfCountdownCompleted.bind(this);
    this.completeCountDown = this.completeCountDown.bind(this);
    this.updateClock = this.updateClock.bind(this);
  }

  componentWillMount() {
    const { floor, ceiling } = this.state;
    const floorAsMoment = moment('2018-06-23 ' + floor);
    const ceilingAsMoment = moment('2018-06-23 ' + ceiling);
    this.setState({floorAsMoment: floorAsMoment});
    this.setState({ceilingAsMoment: ceilingAsMoment});
  }

  componentDidMount() {

  }

  /*increaseTime() {
    let currentModifier = this.state.modifier;
    currentModifier = currentModifier - (currentModifier * 0.2);
    this.setState({modifier: currentModifier});
    clearInterval(this.intervalId);
    setInterval(this.decrementTime, this.state.modifier);
  }*/


  decrementTime(amount = 1, t = 'seconds') {
    if (!this.state.countdownComplete) {
      let current = moment('2018-06-23' + ' ' + this.state.currentTime);
      this.checkIfCountdownCompleted(current);

      let diminishedTime = current.subtract(amount, t);
      this.setState({currentTime: moment(diminishedTime).format('H:mm:ss')});
      current = moment('2018-06-23' + ' ' + this.state.currentTime);
      localStorage.setItem('current', current);
    } else {
      this.setState({currentTime: 'GAME OVER'});
    }
  }

  checkIfCountdownCompleted(current) {
    const { ceilingAsMoment } = this.state;
    let currentHour = current.hours();
    let timeWrapAround = (currentHour <= 23 && currentHour >= 6);
    if (current.isAfter(this.state.floorAsMoment)) {
      if (timeWrapAround) {
        this.completeCountDown();
      }
    } else {
      this.completeCountDown();
    }
  }

  // instantiateTime() {
  //   const { countdown, floor } = this.state;
  //   if (localStorage.getItem('current')) {
  //     let current = localStorage.getItem('current');
  //     this.setState({ currentTime: moment(current).format('H:mm:ss')})
  //     localStorage.setItem('current', current);
    
  //   } else {
  //     let current = moment('2018-06-23' + ' ' + countdown);
  //     this.setState({ currentTime: moment(current).format('H:mm:ss')})
  //     localStorage.setItem('current', current);
  //   }
  // }

  completeCountDown() {
    clearInterval(this.intervalId);
    this.setState({countdownComplete: true});
    this.setState({currentTime: 'GAME OVER'});
    this.decrementTime();

  }

  updateClock(timeStr = '04:59:00') {
    let current = moment('2018-06-23' + ' ' + timeStr);
    this.setState({ currentTime: moment(current).format('H:mm:ss')})
    localStorage.setItem('current', current);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { currentTime } = this.state;
    return (
      <div className="clock-container countdown-clock">
        { currentTime }
      </div>
    )
  }
}

export default CountdownClock;