import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import CryptoList from '../../components/CryptoList';

class Assets extends Component {
  state = {
    tokens: [],
  }

  componentDidMount() {
    const { token } = this.props;
    axios.get('http://api.etharek.tech/API/administration/cryptocurrencies/getCryptocurrencies')
      .then((response) => {
        this.setState({ tokens: response.data })
        axios.get('http://api.etharek.tech/API/users/getBalances', {
          params: {
            token
          }
        })
          .then((response) => {
            const newTokens = [];
            this.state.tokens.map((token) => {
              for (let i = 0; i < response.data.length; i++) {
                const id = response.data[i].cryptocurrency_id;
                if (token._id === id) {
                  const availableBalance = response.data[i].availableBalance;
                  const fullBalance = response.data[i].fullBalance;
                  const newToken = { ...token, availableBalance, fullBalance };
                  newTokens.push(newToken);
                  break;
                } else if (i === response.data.length - 1) {
                  const newToken = { ...token, availableBalance: 0, fullBalance: 0 };
                  newTokens.push(newToken);
                }
              }
            })
            this.setState({ tokens: newTokens });
          })
          .catch((error) => console.log(error.response));
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { tokens } = this.state;
    const columnNames = ['Name', 'Ticker', 'Available Balance', 'Full Balance'];
    return (
      <CryptoList 
        tokens={tokens} 
        columnNames={columnNames}
      />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(Assets);