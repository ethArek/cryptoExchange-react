import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sha256 from 'sha256';
import axios from 'axios';

class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    error: '',
  }

  onEmailChange = (e) => {
    const { value: email } = e.target;
    this.setState({ email });
  };

  onPasswordChange = (e) => {
    const { value: password } = e.target;
    this.setState({ password });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('http://api.etharek.tech/api/users/register', {
      email: email,
      password: sha256(password),
    })
      .then((response) => {
        const { message } = response.data;
        this.setState({ message });
      })
      .catch((error) => {
        const { data } = error.response;
        this.setState({ error: data });
      });
  }

  render() {
    const { message, error } = this.state; 
    return (
      <div className="form">
        <div className="form__header">
          <h1 className="heading-primary">Sign Up</h1>
          {
            message && 
              <div className="alert alert-info" role="alert">
                {message}
              </div>
          }
          {
            error && 
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
          }
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
              onChange={this.onEmailChange}
            />
          </div>
          <div className="form__group">
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input"
              onChange={this.onPasswordChange}
            />
          </div>
          <div className="form__buttons">
            <Link to="/" className="button-link">
              &larr; Go back
            </Link>
            <button className="button button--primary">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;