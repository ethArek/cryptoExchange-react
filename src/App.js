import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import CreateHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import configureStore from './store/store';
import { login } from './actions/auth';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TradePage from './pages/TradePage';

import 'bootstrap/scss/bootstrap.scss';
import './styles/main.scss';

const history = CreateHistory();
const store = configureStore();

class App extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem('token');
    const email = window.localStorage.getItem('email');
    if (token && email) {
      store.dispatch(login(token, email));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <PublicRoute path="/login" component={LoginPage} />
            <PublicRoute path="/register" component={RegisterPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/trade" exact component={DashboardPage} />
            <PrivateRoute path="/assets" component={DashboardPage} />
            <PrivateRoute path="/trade/:ticker" component={TradePage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
