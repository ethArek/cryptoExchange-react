import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn } from 'react-feather';

const LandingPage = () => (
  <div className="header">
    <div className="header__box">
      <h1 className="heading-primary">
        <span className="heading-primary--sub heading-primary--sub--2">Welcome to</span>
        <span className="heading-primary--main">Crypto Market</span>
        <span className="heading-primary--sub heading-primary--sub--1">the</span>
      </h1>
      <div className="buttons">
        <Link to="/register" className="button button--primary margin-right-small">
          Register now 
          <i className="button__icon"><UserPlus /></i>
        </Link>
        <Link to="/login" className="button button--primary-outline">
          Login
          <i className="button__icon"><LogIn /></i>
        </Link>
      </div>
    </div>
  </div>
); 

export default LandingPage;