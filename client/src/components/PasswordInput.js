import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        attempt: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
      correctPasswords: PropTypes.number
  }

  handleChange(e) {
      this.setState({attempt: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { attempt } = this.state;
    if (attempt.length > 0) {
      console.log('Attempting password');
      this.props.attemptPassword(attempt.trim());
      this.setState({attempt: ''});
    }
  }
  
  render() {
    const { attempt } = this.state;
    const { placeholder, disabled } = this.props;
    return (
      <div className="column is-half is-offset-one-quarter">
        <form onSubmit={this.handleSubmit}>

          <input className="input" type="password" placeholder={placeholder} value={attempt} onChange={this.handleChange} disabled={disabled}/>
          <div class="has-text-centered">
            <button className="button is-info is-rounded submit-btn" type="submit">Submit Password Attempt</button>
          </div>
        </form>
      </div>
    )
  }
}



export default PasswordInput;