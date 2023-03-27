import React from 'react';

import './Table.css';

const Table = (props) => {
  const data = props.payload.data || [];

  return <div className='table-container'><table><tbody>
    {data.map((row, i) =>
      <tr key={i}>
        {row.map((column, j) =>
          <td key={i*10+j}>{column}</td>
        )}
      </tr>
    )}
  </tbody></table></div>;
};

export default Table;
