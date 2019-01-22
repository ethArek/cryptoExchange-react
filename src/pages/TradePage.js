import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import BuyOrder from '../components/BuyOrder';
import Chart from '../components/Chart';

class TradePage extends Component {
  state = {
    buyPrice: 0,
    buyAmount: 1,
    sellPrice: 0,
    sellAmount: 1,
    cryptocurrency_id: undefined,
    buyOrders: [],
    sellOrders: [],
    message: '',
    lastPrice: 0,
  };

  componentWillMount() {
    const { ticker } = this.props.match.params;
    axios.get(`http://api.etharek.tech/API/orders/${ticker}`)
      .then((response) => {
        const price = response.data.lastPrice;
        this.setState({ lastPrice: price });
        const id = response.data._id;
        this.setState({ buyPrice: price, sellPrice: price, cryptocurrency_id: id });
        axios.post('http://api.etharek.tech/API/orders/getOrders', {
          cryptocurrency_id: id
        })
          .then((response) => {
            const { buyOrders, sellOrders } = response.data;
            this.setState({ buyOrders, sellOrders });
          })
          .catch((error) => console.log(error.response));
      })
      .catch((error) => console.log(error.response));    
  }

  onBuyAmountChange = (e) => {
    const { value: buyAmount } = e.target;
    if (buyAmount > 0) {
      this.setState({ buyAmount });
    }
  }

  onSellAmountChange = (e) => {
    const { value: sellAmount } = e.target;
    if (sellAmount > 0) {
      this.setState({ sellAmount });
    }
  }

  onBuyPriceChange = (e) => {
    const { value: buyPrice } = e.target;
    if (buyPrice > 0) {
      this.setState({ buyPrice });
    }
  }

  onSellPriceChange = (e) => {
    const { value: sellPrice } = e.target;
    if (sellPrice > 0) {
      this.setState({ sellPrice });
    }
  }

  onSellFormSubmit = (e) => {
    e.preventDefault();
    const isBuyOrder = false;
    const { token } = this.props;
    const { cryptocurrency_id, sellAmount, sellPrice } = this.state;
    axios.post('http://api.etharek.tech/API/orders/placeOrder', {
      token,
      cryptocurrency_id,
      amount: sellAmount,
      price: sellPrice,
      isBuyOrder,
    })
      .then((response) => {
        const { user_id, _id } = response.data;
        const obj = {
          amount: sellAmount,
          closed: [],
          cryptocurrency_id,
          isBuyOrder: false,
          isCompleted: false,
          openedAt: new Date().toISOString(),
          price: sellPrice,
          user_id,
          _id,
        }
        this.setState({
          sellOrders: [...this.state.sellOrders, obj],
        })
        Alert.success('Order succesfully submitted!', {
          position: 'bottom-left',
          effect: 'genie',
          beep: false,
          timeout: 'none',
          offset: 100
        });
      })
      .catch((error) => {
        Alert.error('Order submission failed!', {
          position: 'bottom-left',
          effect: 'genie',
          beep: false,
          timeout: 'none',
          offset: 100
        });
      });
  }

  onBuyFormSubmit = (e) => {
    const isBuyOrder = true;
    e.preventDefault();
    const { token } = this.props;
    const { cryptocurrency_id, buyAmount, buyPrice } = this.state;
    axios.post('http://api.etharek.tech/API/orders/placeOrder', {
      token,
      cryptocurrency_id,
      amount: buyAmount,
      price: buyPrice,
      isBuyOrder,
    })
      .then((response) => {
        const { user_id, _id } = response.data;
        const obj = {
          amount: buyAmount,
          closed: [],
          cryptocurrency_id,
          isBuyOrder: true,
          isCompleted: false,
          openedAt: new Date().toISOString(),
          price: buyPrice,
          user_id,
          _id,
        }
        this.setState({
          buyOrders: [...this.state.buyOrders, obj],
        })
      })
      .catch((error) => console.log(error.response));
  }

  render() {
    const {
      buyPrice,
      buyAmount,
      sellPrice,
      sellAmount,
      buyOrders,
      sellOrders,
      lastPrice
    } = this.state;
    const { ticker } = this.props.match.params;
    return (
      <div className="container trade">
        <div className="row">
          <div className="col-md-9 trade__chart">
            <Chart ticker={ticker} />
            <Alert stack={{limit: 3}} />
          </div>
          <div className="col-md-3 trade__orders">
            <h2>Buy Orders</h2>
            <div className="trade__buy">
              <div className="row trade__line">
                <div className="col-4">
                  Price ETH
                </div>
                <div className="col-4 pr-0">
                  Amount {ticker}
                </div>
                <div className="col-4">
                  Volume ETH
                </div>
              </div>
              {buyOrders.map((buyOrder) => (
                <BuyOrder key={buyOrder._id} {...buyOrder} />
              ))}
            </div>
            <h2>Sell Orders</h2>
            <div className="trade__sell">
              {sellOrders.map((sellOrder) => (
                <BuyOrder key={sellOrder._id} {...sellOrder} />
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.onSellFormSubmit}>
              <div className="form__group">
                <label className="form__label">Last Price: {lastPrice} ETH</label>
                <input
                  onChange={this.onSellPriceChange}
                  type="number" 
                  placeholder={`Last Price: ${sellPrice} ETH`}
                  className="input"
                  value={sellPrice}
                />
              </div>
              <div className="form__group">
                <label className="form__label">Amount</label>
                <input
                  onChange={this.onSellAmountChange}
                  type="number" 
                  placeholder="amount" 
                  className="input"
                  value={sellAmount} 
                />
              </div>
              <div className="form__group">
                <input type="submit" value="Sell" className="button button--primary trade__button" />
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <form onSubmit={this.onBuyFormSubmit}>
              <div className="form__group">
                <label className="form__label">Last Price: {lastPrice} ETH</label>
                <input
                  onChange={this.onBuyPriceChange}
                  type="number"
                  placeholder={`Last Price: ${buyPrice} ETH`}
                  className="input"
                  value={buyPrice}
                />
              </div>
              <div className="form__group">
                <label className="form__label">Amount</label>
                <input
                  onChange={this.onBuyAmountChange}
                  type="number" 
                  placeholder="amount"
                  className="input" 
                  value={buyAmount} 
                />
              </div>
              <div className="form__group">
                <input type="submit" value="Buy" className="button button--primary trade__button" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(withRouter(TradePage));