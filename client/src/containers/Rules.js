import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Title from '../components/Title';
import ContentMessage from '../components/ContentMessage';
import Container from '../components/Container';
import Card from '../components/Card';
import Columns from '../components/Columns';
import Column from '../components/Column';

const Rules = (props) => {
  // Probably a better way to do this
  
  if (!localStorage.getItem('token')) {
    return <Redirect to='/' />
  }
  return (
    <Container className="game">
      <Columns>
        <Column>
          <Card className="card-container">
          <Title title="Ransomware" classes={'title has-text-danger has-text-centered'}/>
          <Title title="Rules" classes={'subtitle has-text-danger has-text-centered'} />
            <div className="column is-half is-offset-one-quarter">
            <h4 className="subtitle">I HAVE TAKEN CONTROL OF ALL PATIENT FILES.</h4>
            
            <h4 className="subtitle">YOU HAVE 5 HOURS TO SEND 10 BITCOIN TO THE FOLLOWING ACCOUNT: 1D1HkwCHJvMzhWhZWUQtivprhJDpMwQWWR. </h4>

            <h4 className="subtitle">FAILURE TO DO SO WILL RESULT IN THE DELETION OF ALL MEDICAL RECORDS.</h4>

            <h4 className="subtitle">THIS DEVICE IS SET TO TRIGGER MALWARE THAT WILL INFECT EVERY COMPUTER ON THE HOSPITAL NETWORK. </h4>


            <h4 className="subtitle">IF I RECIVEVE MY MONEY IN TIME, I WILL RELEASE THE SIX CODES TO DEFUSE THE DEVICE. </h4>

            <h4 className="subtitle">IF YOU TRY TO STOP IT YOURSELF THE CLOCK WILL SPEED UP. </h4>

              <ul className="rules-list">
                <li>You must find 6 hidden passwords</li>
                <li>You are given 5 hours to find all 6 passwords</li>
                <li>The time limit is 5 hours</li>
                <li>For each incorrect attempt, 15 minutes will be decremented from the time</li>
              </ul>
            </div>
          <Link to="/main">
            <div class="has-text-centered">
              <button className="button is-info is-rounded has-text-centered submit-btn">Begin!</button>
            </div>
          </Link>
          </Card>
        </Column>
      </Columns>
    </Container>
  )
}

export default Rules;