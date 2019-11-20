import React from 'react';

const StatusRun = ({ status, paidClick }) => {
  return (
    <td>
      {status === 'not_paid' ? (
        <button onClick={paidClick} className="btn btn-info">
          Оплатить
        </button>
      ) : (
        <button onClick={paidClick} className="btn btn-secondary" disabled>
          Оплачено
        </button>
      )}
    </td>
  );
};
export default StatusRun;
