import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import ContentMessage from '../components/ContentMessage';
import Container from '../components/Container';
import Card from '../components/Card';
import Columns from '../components/Columns';
import Column from '../components/Column';



const Rules = (props) => {
  return (
    <Container>
      <Columns>
        <Column>
          <Card className="card-container">
          <Title title="Ransomware" classes={'title has-text-danger has-text-centered'}/>
          <Title title="Rules" classes={'subtitle has-text-danger has-text-centered'} />
            <div className="column is-half is-offset-one-quarter">
              <ul className="rules-list">
                <li>You must find 5 hidden passwords</li>
                <li>You are given 5 hours to find all 5 passwords</li>
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