import React from "react";

import CryptoListSingle from "./CryptoListSingle";

const CryptoList = ({ tokens, columnNames }) => (
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
        <CryptoListSingle key={token._id} token={token} />
      ))}
    </tbody>
  </table>
);

export default CryptoList;
