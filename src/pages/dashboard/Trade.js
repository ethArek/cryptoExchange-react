import React, { Component } from 'react';
import axios from 'axios';

import CryptoListTrade from '../../components/CryptoListTrade';

class Trade extends Component {
  state = {
    tokens: [],
  }
  componentDidMount() {
    axios.get('http://api.etharek.tech/API/administration/cryptocurrencies/getCryptocurrencies')
      .then((response) => {
        this.setState({ tokens: response.data });
        console.log(response.data);
      })
      .catch((error) => console.log(error.response));
  }

  render() {
    const { tokens } = this.state;
    const columnNames = ['Name', 'Ticker', 'Last Price'];
    return (
      <CryptoListTrade
        tokens={tokens}
        columnNames={columnNames}
      />
    );
  }
}

export default Trade;