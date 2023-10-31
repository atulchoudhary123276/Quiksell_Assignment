import React from "react";
import "../Css/Ticket.css"; // Import your CSS file

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket">
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-details">
        <p>Assigned to: {ticket.assigned_to}</p>
        <p>Status: {ticket.status}</p>
        <p>Priority: {ticket.priority}</p>
        {/* Display other ticket details as needed */}
      </div>
    </div>
  );
};

export default Ticket;
