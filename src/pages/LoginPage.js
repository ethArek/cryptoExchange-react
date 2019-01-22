import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import sha256 from "sha256";
import axios from "axios";

import { login } from '../actions/auth';

class LoginPage extends Component {
  onEmailChange = e => {
    const { value: email } = e.target;
    this.setState({ email });
  };

  onPasswordChange = e => {
    const { value: password } = e.target;
    this.setState({ password });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { login, history } = this.props;
    axios
      .post('http://api.etharek.tech/API/users/login', {
        email: email,
        password: sha256(password)
      })
      .then(response => {
        const { token, email } = response.data;
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('email', email);
        login(token, email);
        history.push('/dashboard');
      })
      .catch(error => console.log(error.response.data));
  };

  render() {
    return (
      <div className="form">
        <div className="form__header">
          <h1 className="heading-primary">Log In</h1>
        </div>
        <form 
          className="form__box"
          onSubmit={this.onFormSubmit}
        >
          <div className="form__group">
            <input
              type="email"
              placeholder="your@email.com"
              name="email"
              className="input"
              required
              onChange={this.onEmailChange}
              />
          </div>
          <div className="form__group">
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input"
              required
              onChange={this.onPasswordChange}
            />
          </div>
          <div className="form__buttons">
            <Link to="/" className="button-link">
              &larr; Go back
            </Link>
            <button className="button button--primary">Sign in</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (token, email) => dispatch(login(token, email))
}); 

export default connect(undefined, mapDispatchToProps)(LoginPage);
