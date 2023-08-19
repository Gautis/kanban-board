import React from 'react';
import './User.css';

const User = ({ user }) => {
  return (
    <div className={`user ${user.available ? 'available' : 'unavailable'}`}>
      {user.name}
    </div>
  );
};

export default User;
