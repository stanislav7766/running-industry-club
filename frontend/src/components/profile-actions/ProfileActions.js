import React from 'react';
import { FaUserCircle, FaRunning, FaMap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileActions = () => (
  <div className="btn-group-vertical d-block  mb-4">
    <Link to="/edit-profile" className="btn btn-outline-secondary">
      <FaUserCircle className="mr-2" /> Редактировать профиль
    </Link>
    <Link to="/add-run" className="btn btn-outline-secondary">
      <FaRunning className="mr-2" />
      Добавить недавний забег
    </Link>
    <Link to="/booking-run" className="btn btn-outline-secondary">
      <FaMap className="mr-2" />
      Запланированные забеги
    </Link>
  </div>
);

export default ProfileActions;
