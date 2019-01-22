import React from "react";
import { NavLink } from "react-router-dom";

const DashboardMenu = () => (
  <div className="dashboard__menu">
    <NavLink
      to="/dashboard"
      className="dashboard__menu__button button-secondary"
      activeClassName="button-secondary--active"
    >
      My account
    </NavLink>
    <NavLink
      to="/assets"
      className="dashboard__menu__button button-secondary"
      activeClassName="button-secondary--active"
    >
      Assets
    </NavLink>
    <NavLink
      to="/trade"
      className="dashboard__menu__button button-secondary"
      activeClassName="button-secondary--active"
    >
      Trade
    </NavLink>
    <NavLink
      to="/withdraw"
      className="dashboard__menu__button button-secondary"
      activeClassName="button-secondary--active"
    >
      Withdraw
    </NavLink>
  </div>
);

export default DashboardMenu;
