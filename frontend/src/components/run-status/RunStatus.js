import React from 'react';
import { Button } from 'react-bootstrap';

const RunStatus = ({ status, paidClick }) => (
  <td>
    {status === 'not_paid' ? (
      <Button onClick={paidClick} variant="info">
        Оплатить
      </Button>
    ) : (
      <Button onClick={paidClick} variant="secondary" disabled>
        Оплачено
      </Button>
    )}
  </td>
);
export default RunStatus;
