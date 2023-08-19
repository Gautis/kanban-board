import React from 'react';
import './Ticket.css'; 
const Ticket = ({ ticket }) => {
  return (
    <div className={`ticket priority-${ticket.priority}`}>
      <div className="ticket-title">{ticket.title}</div>
      <div className="ticket-status">{ticket.status}</div>
      <div className="ticket-user">{ticket.userId}</div>
    </div>
  );
};

export default Ticket;
