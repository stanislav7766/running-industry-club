import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import preparePace from '../../utils/preparePace';
import PropTypes from 'prop-types';

const RunsTable = ({ deleteRun, runs }) => {
  const onDeleteClick = run_id => deleteRun(run_id);
  const runsSorted = runs.sort((a, b) => new Date(b.date) - new Date(a.date));
  const Runs = runsSorted.map((run, index) =>
    index < 3 ? (
      <tr key={run._id}>
        <td>{run.nameRun}</td>
        <td>{run.date}</td>
        <td>{run.locationRun}</td>
        <td>{run.distance}</td>
        <td>{run.time}</td>
        <td>{preparePace(run.pace)}</td>
        <td>
          <Button onClick={() => onDeleteClick(run._id)} variant="danger">
            Удалить
          </Button>
        </td>
      </tr>
    ) : null
  );
  return (
    <Fragment>
      <h4 className="mb-4 text-center">Недавние забеги</h4>
      <div className="table-responsive">
        <table className="table">
          <thead>{Runs}</thead>
        </table>
      </div>
    </Fragment>
  );
};

RunsTable.propTypes = {
  deleteRun: PropTypes.func.isRequired,
  runs: PropTypes.array.isRequired
};
export default RunsTable;
