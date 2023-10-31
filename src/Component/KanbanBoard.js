import React from "react";
import Ticket from "./Ticket";
import "../Css/KanbanBoard.css"; // Import your CSS file

const KanbanBoard = ({ tickets, groupingOption, sortingOption ,users}) => {
  
  let groupedTickets = [];

  if (groupingOption === "status") {
    groupedTickets = groupByStatus(tickets);
  } else if (groupingOption === "users") {
    groupedTickets = groupByUser(tickets, users); // Pass users to the function
  } else if (groupingOption === "priority") {
    groupedTickets = groupByPriority(tickets);
  }

  if (sortingOption === "priority") {
    groupedTickets = sortTicketsByPriority(groupedTickets);
  } else if (sortingOption === "title") {
    groupedTickets = sortTicketsByTitle(groupedTickets);
  }
  return (
    <div className="kanban-board">
      {groupedTickets.map((group, index) => (
        <div key={index} className="column">
          <h2>{group.title}</h2>
          {group.tickets.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

// Helper function to group tickets by status
const groupByStatus = (tickets) => {
    const grouped = {};
  
    tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!grouped[status]) {
        grouped[status] = [];
      }
      grouped[status].push(ticket);
    });
  
    return Object.keys(grouped).map((status) => ({
      title: status,
      tickets: grouped[status],
    }));
  };
  
 // Helper function to group tickets by user
const groupByUser = (tickets, users) => {
  const grouped = {};

  tickets.forEach((ticket) => {
    const userId = ticket.userId;
    const user = users[userId].name;
    if (!grouped[user]) {
      grouped[user] = [];
    }
    grouped[user].push(ticket);
  });

  return Object.keys(grouped).map((user) => ({
    title: user,
    tickets: grouped[user],
  }));
};

  
  // Helper function to group tickets by priority
  const groupByPriority = (tickets) => {
    const grouped = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    };
  
    tickets.forEach((ticket) => {
      const priority = ticket.priority;
      grouped[priority].push(ticket);
    });
  
    return Object.keys(grouped).map((priority) => ({
      title: getPriorityTitle(priority), // Use a function to get the title from the priority value
      tickets: grouped[priority],
    }));
  };
  
  // Helper function to sort tickets by priority
  const sortTicketsByPriority = (groupedTickets) => {
    // Sort tickets within each group based on priority
    groupedTickets.forEach((group) => {
      group.tickets.sort((a, b) => b.priority - a.priority);
    });
  
    return groupedTickets;
  };
  
  // Helper function to sort tickets by title
  const sortTicketsByTitle = (groupedTickets) => {
    // Sort tickets within each group based on title (ascending order)
    groupedTickets.forEach((group) => {
      group.tickets.sort((a, b) => a.title.localeCompare(b.title));
    });
  
    return groupedTickets;
  };
  
  // Helper function to get priority title from priority value
  const getPriorityTitle = (priority) => {
    const priorityMap = {
      0: "No priority",
      1: "Low",
      2: "Medium",
      3: "High",
      4: "Urgent",
    };
    return priorityMap[priority];
  };
  

export default KanbanBoard;
