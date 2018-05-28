import React, { Component } from 'react';
import moment from 'moment';
import CountdownClockCSS from './CountdownClock.css';


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
    this.decrement = this.decrement.bind(this);
    this.checkIfCountdownCompleted = this.checkIfCountdownCompleted.bind(this);
    this.instantiateTime = this.instantiateTime.bind(this);
    this.completeCountDown = this.completeCountDown.bind(this);
  }

  componentWillMount() {
    const { countdown, floor, ceiling } = this.state;
    const floorAsMoment = moment('2018-06-23 ' + floor);
    const ceilingAsMoment = moment('2018-06-23 ' + ceiling);
    this.setState({floorAsMoment: floorAsMoment});
    this.setState({ceilingAsMoment: ceilingAsMoment});
    this.instantiateTime();

  }

  componentDidMount() {
    this.intervalId = setInterval(this.decrementTime, this.state.modifier);
  }

  /*increaseTime() {
    let currentModifier = this.state.modifier;
    currentModifier = currentModifier - (currentModifier * 0.2);
    this.setState({modifier: currentModifier});
    clearInterval(this.intervalId);
    setInterval(this.decrementTime, this.state.modifier);
  }*/

  decrementTime(amount = 1, t = 'seconds') {
    let current = moment('2018-06-23' + ' ' + this.state.currentTime);
    this.checkIfCountdownCompleted(current);

    let diminishedTime = current.subtract(amount, t);
    this.setState({currentTime: moment(diminishedTime).format('H:mm:ss')});
    current = moment('2018-06-23' + ' ' + this.state.currentTime);
    localStorage.setItem('current', current);
  }

  decrement() {
    this.decrementTime(15, 'minutes');
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

  instantiateTime() {
    const { countdown, floor } = this.state;
    if (localStorage.getItem('current')) {
      let current = localStorage.getItem('current');
      this.setState({ currentTime: moment(current).format('H:mm:ss')})
      localStorage.setItem('current', current);
    
    } else {
      let current = moment('2018-06-23' + ' ' + countdown);
      this.setState({ currentTime: moment(current).format('H:mm:ss')})
      localStorage.setItem('current', current);
    }
  }

  completeCountDown() {
    clearInterval(this.intervalId);
    this.setState({countdownComplete: true});
    alert('Countdown Complete');
  }

  render() {
    const { currentTime } = this.state;
    return (
      <div className="box countdown-clock">
        { currentTime }
      </div>
    )
  }
}

export default CountdownClock;