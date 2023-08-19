import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, users }) => {
  const [displayDropdownOpen, setDisplayDropdownOpen] = useState(false);
  const [groupOption, setGroupOption] = useState('status');
  const [sortOption, setSortOption] = useState('priority');
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
    const grouped = {};

    if (groupOption === 'status') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.status]) {
          grouped[ticket.status] = [];
        }
        grouped[ticket.status].push(ticket);
      });
    } else if (groupOption === 'user') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.userId]) {
          grouped[ticket.userId] = [];
        }
        grouped[ticket.userId].push(ticket);
      });
    } else if (groupOption === 'priority') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.priority]) {
          grouped[ticket.priority] = [];
        }
        grouped[ticket.priority].push(ticket);
      });
    }

    const sortedTickets = Object.values(grouped).map(group =>
      group.sort((a, b) =>
        sortOption === 'priority'
          ? b.priority - a.priority
          : a.title.localeCompare(b.title)
      )
    );

    setGroupedTickets(grouped);
  }, [tickets, groupOption, sortOption]);

  return (
    <div className="kanban-board">
      <div className="options">
        <div className="dropdown">
          <div className="display-dropdown-container">
            <select
              id="display"
              className="display-dropdown"
              onClick={() => setDisplayDropdownOpen(!displayDropdownOpen)}
            >
              <option value="">Display</option>
            </select>
            {displayDropdownOpen && (
              <div className="dropdowns">
                <div className="grouping-dropdown">
                  <label htmlFor="grouping">Grouping:</label>
                  <select
                    id="grouping"
                    value={groupOption}
                    onChange={e => setGroupOption(e.target.value)}
                  >
                    <option value="status">By Status</option>
                    <option value="user">By User</option>
                    <option value="priority">By Priority</option>
                  </select>
                </div>
                <div className="ordering-dropdown">
                  <label htmlFor="ordering">Ordering:</label>
                  <select
                    id="ordering"
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value)}
                  >
                    <option value="priority">By Priority</option>
                    <option value="title">By Title</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map(groupKey => (
          <div key={groupKey} className="column">
            <h2>{groupKey}</h2>
            {groupedTickets[groupKey].map(ticket => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
