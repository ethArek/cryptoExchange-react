import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

class MyAccount extends Component {
  state = {
    name: '',
    address: '',
  };

  onNameChange = e => {
    const { value: name } = e.target;
    this.setState({ name });
  };

  onAddressChange = e => {
    const { value: address } = e.target;
    this.setState({ address });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { name, address } = this.state;
    const { token } = this.props;
    axios.patch('http://api.etharek.tech/api/users/addEthAddress', {
      name,
      address,
      token,
    })
      .then((response) => {
        Alert.success('Address successfully added!', {
          position: 'bottom-left',
          effect: 'genie',
          beep: false,
          timeout: 'none',
          offset: 100
        });
      })
      .catch((error) => {
        Alert.error('Please provide valid data', {
          position: 'bottom-left',
          effect: 'genie',
          beep: false,
          timeout: 'none',
          offset: 100
        });
      });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form__group">
          <label className="form__label">Name</label>
          <input
            className="input"
            type="text" 
            name="name"
            onChange={this.onNameChange}
          />
        </div>
        <div className="form__group">
          <label className="form__label">Address</label>
          <input 
            className="input"
            type="text" 
            name="address"
            onChange={this.onAddressChange}
          />
        </div>
        <div className="form__group">
          <button className="button button--primary trade__button">Submit</button>
        </div>
        <Alert stack={{limit: 3}} />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(MyAccount);
