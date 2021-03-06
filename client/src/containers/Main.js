import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CountdownClock from '../components/CountdownClock';
import Title from '../components/Title';
import ContentMessage from '../components/ContentMessage';
import Container from '../components/Container';
import Card from '../components/Card';
import Columns from '../components/Columns';
import Column from '../components/Column';
import Navbar from '../components/Navbar';

import PasswordManager from '../components/PasswordManager';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Ransomware',
      subtitle: 'Data deleted in:',
      gameOver: false,
    }
    this.decrementClock = this.decrementClock.bind(this);
    this.gameCompleted = this.gameCompleted.bind(this);
    this.updateClock = this.updateClock.bind(this);
  }

  decrementClock(nextTime) {
    this.child.decrement(nextTime);
  }

  gameCompleted() {
    this.setState({'gameOver': true});
    this.child.completeCountDown();
    // this.child.zeroOutClock();
  }

  updateClock(timeStr) {
    this.child.updateClock(timeStr);
  }

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <Navbar />
        <Container>
          <Columns>
            <Column>
              <Card className="card-container">
              <Title title={this.state.title} classes={'title has-text-danger has-text-centered'}/>
              <Title title={this.state.subtitle} classes={'subtitle has-text-danger has-text-centered'} />
              <CountdownClock ref={ instance => { this.child = instance; }}/>
              <ContentMessage message="To access admin functions, enter the following passwords:" />
              <PasswordManager updateClock={this.updateClock} decrementClock={this.decrementClock} gameCompleted={this.gameCompleted} gameOver={this.state.gameOver}/>
              </Card>
            </Column>
          </Columns>
        </Container>
      </div>
    )
  }
}

export default Main;