import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CountdownClock from '../components/CountdownClock';
import Title from '../components/Title';
import ContentMessage from '../components/ContentMessage';
import Container from '../components/Container';
import Card from '../components/Card';
import Columns from '../components/Columns';
import Column from '../components/Column';


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
  }

  decrementClock() {
    console.log('Calling child decrement');
    this.child.decrement();
  }

  gameCompleted() {
    this.setState({'gameOver': true});
    this.child.completeCountDown();
  }

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to='/' />
    }
    return (
      <Container>
        <Columns>
          <Column>
            <Card className="card-container">
            <Title title={this.state.title} classes={'title has-text-danger has-text-centered'}/>
            <Title title={this.state.subtitle} classes={'subtitle has-text-danger has-text-centered'} />
            <CountdownClock ref={ instance => { this.child = instance; }}/>
            <div className="content has-text-centered">Unless 2 <i className="fab fa-bitcoin"></i> is received by haxxzor@tempmail.com</div>
            <ContentMessage message="To access admin functions: enter the following passwords:" />
            <PasswordManager decrementClock={this.decrementClock} gameCompleted={this.gameCompleted} />
            </Card>
          </Column>
        </Columns>
      </Container>
    )
  }
}

export default Main;