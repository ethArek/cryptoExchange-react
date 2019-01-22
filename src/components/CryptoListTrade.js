import React from 'react';

import CryptoListTradeSingle from './CryptoListTradeSingle';

const CryptoListTrade = ({ tokens, columnNames }) => (
  <table className="table table-hover">
    <thead>
      <tr>        
        {columnNames.map((column) => (
          <th key={column} scope="col">{column}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {tokens.map(token => (
        <CryptoListTradeSingle key={token._id} token={token} />
      ))}
    </tbody>
  </table>
);

export default CryptoListTrade;
