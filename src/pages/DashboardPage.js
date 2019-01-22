import React, { Component } from "react";
import { connect } from 'react-redux';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../components/Navbar";
import DashboardMenu from "../components/DashboardMenu";
import MyAccount from "./dashboard/MyAccount";
import Assets from "./dashboard/Assets";
import Trade from "./dashboard/Trade";

library.add(faBitcoin, faEthereum, faDollarSign);

class DashboardPage extends Component {
  rednerContent = (path) => {
    switch (path) {
      case '/dashboard':
        return <MyAccount />;
      case '/assets':
        return <Assets />;
      case '/trade':
        return <Trade />;
      default: 
        return <MyAccount />;
    }
  }

  render() {
    const { path } = this.props.match;
    const { email } = this.props;
    return (
      <div>
        <Navbar />
        <div className="container dashboard">
          <div className="dashboard__header">
            <h2 className="heading-secondary">Welcome back, {email}</h2>
            <div className="dashboard__values">
              <div className="dashboard__values__single">
                <span className="dashboard__values__amount">2.53&nbsp;</span>
                <FontAwesomeIcon
                  icon={["fab", "bitcoin"]}
                  style={{ color: "#ff9900" }}
                />
              </div>
              <div className="dashboard__values__single">
                <span className="dashboard__values__amount">74.5&nbsp;</span>
                <FontAwesomeIcon icon={["fab", "ethereum"]} />
              </div>
              <div className="dashboard__values__single">
                <span className="dashboard__values__amount">9285&nbsp;</span>
                <FontAwesomeIcon
                  icon="dollar-sign"
                  style={{ color: "#85bb65" }}
                />
              </div>
            </div>
          </div>
          <div className="row dashboard__main">
            <div className="col-md-3">
              <DashboardMenu />
            </div>
            <div className="col-md-9">
              {this.rednerContent(path)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.auth.email,
});

export default connect(mapStateToProps)(DashboardPage);
