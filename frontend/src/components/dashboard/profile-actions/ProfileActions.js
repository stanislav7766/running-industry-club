import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => (
  <div className="text-right">
    <div className="btn-group-vertical mb-3">
      <Link to="/edit-profile" className="btn btn-outline-secondary text-left">
        <i className="fas fa-user-circle text-secondary mr-1" /> Редактировать
        профиль
      </Link>
      <Link to="/add-run" className="btn btn-outline-secondary text-left">
        <i className="fab fa-black-tie text-secondary mr-1" /> Добавить недавний
        забег
      </Link>
      <Link to="/booked-runs" className="btn btn-outline-secondary text-left">
        <i className="fas fa-graduation-cap text-secondary mr-1" />{' '}
        Запланированные забеги
      </Link>
    </div>
  </div>
);

export default ProfileActions;
