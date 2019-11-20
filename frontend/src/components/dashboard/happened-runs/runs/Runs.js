import React from 'react';
import { connect } from 'react-redux';
import { deleteRun } from '../../../../actions/profileActions';
import PropTypes from 'prop-types';

const Runs = props => {
  const onDeleteClick = id => props.deleteRun(id);
  const Runs = props.runs.map(run => (
    <tr key={run._id}>
      <td>{run.nameRun}</td>
      <td>{run.date}</td>
      <td>{run.locationRun}</td>
      <td>{run.distance}</td>
      <td>{run.time}</td>
      <td>
        <button
          onClick={() => onDeleteClick(run._id)}
          className="btn btn-danger"
        >
          Удалить
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h4 className="mb-4 text-center">Недавние забеги</h4>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Забег</th>
              <th>Дата</th>
              <th>Город</th>
              <th>Дистанция(км)</th>
              <th>Время(мин\сек)</th>
              <th />
            </tr>
            {Runs}
          </thead>
        </table>
      </div>
    </div>
  );
};

Runs.propTypes = {
  deleteRun: PropTypes.func.isRequired
};
export default connect(
  null,
  { deleteRun }
)(Runs);
