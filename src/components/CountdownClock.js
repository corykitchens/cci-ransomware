import React, { Component } from 'react';
import moment from 'moment';

class CountdownClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      modifier: 1000
    }
    this.decrementTime = this.decrementTime.bind(this);
    this.increaseTime = this.increaseTime.bind(this);
  }

  increaseTime() {
    let currentModifier = this.state.modifier;
    currentModifier = currentModifier - (currentModifier * 0.2);
    this.setState({modifier: currentModifier});
    clearInterval(this.intervalId);
    setInterval(this.decrementTime, this.state.modifier);
  }

  componentWillMount() {
    var now = moment('12-1-1 17:59:59');
    this.state.currentTime = moment(now).format('h:mm:ss')
  }

  componentDidMount() {
    this.intervalId = setInterval(this.decrementTime, this.state.modifier);
  }

  decrementTime() {
    let current = moment('12-1-1' + ' ' + this.state.currentTime);
    let diminishedTime = current.subtract(1, 'seconds');
    this.setState({currentTime: moment(diminishedTime).format('h:mm:ss')});
  }

  render() {
    const { currentTime } = this.state;
    return (
      <div className="box">
        { currentTime }
        <button onClick={this.increaseTime}>Click</button>
      </div>
    )
  }
}

export default CountdownClock;