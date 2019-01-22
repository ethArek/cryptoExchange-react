import React from 'react';

const CryptoListSingle = ({ token : { name, ticker, availableBalance, fullBalance } }) => (
    <tr>
      <td>{name}</td>
      <td>{ticker}</td>
      <td>{availableBalance}</td>
      <td>{fullBalance}</td>
    </tr>
);

export default CryptoListSingle;