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
    this.props.attemptPassword(attempt);
  }
  
  render() {
    const { attempt } = this.state;
    const { placeholder, disabled } = this.props;
    return (
      <div className="column">
        <form onSubmit={this.handleSubmit}>
          <input className="input" type="text" placeholder={placeholder} value={attempt} onChange={this.handleChange} disabled={disabled}/>
        </form>
      </div>
    )
  }
}



export default PasswordInput;