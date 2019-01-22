import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

class Navbar extends Component {
  handleLogout = () => {
    const { logout } = this.props;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('email');
    logout();
  }
  render() {
    return (
      <nav className="navi">
        <div className="container navi__container">
          <ul className="navi__items">
            <li className="navi__item navi__brand">
              <Link to="/" className="navi__link">
                Crypto
              </Link>
            </li>
          </ul>
          <ul className="navi__items">
            <li className="navi__item">
              <Link to="#" className="navi__link">
                My account
              </Link>
              <Link to="#" onClick={() => this.handleLogout()} className="navi__link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Navbar);
