import React from 'react';
import { withRouter } from "react-router-dom";

const CryptoListTradeSingle = ({ token : { name, ticker, lastPrice }, history }) => (
    <tr onClick={() => history.push(`/trade/${ticker}`)}>
      <td>{name}</td>
      <td>{ticker}</td>
      <td>{lastPrice}</td>
    </tr>
);

export default withRouter(CryptoListTradeSingle);