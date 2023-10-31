import React, { useState, useEffect } from "react"

// import "./App.css"; // Import your CSS file

import KanbanBoard from "./Component/KanbanBoard";

const App = () => {
  // Initialize state and retrieve user preferences from localStorage
  const [tickets, setTickets] = useState([]);
  const [users1, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem("groupingOption") || "status"
  );
  const [sortingOption, setSortingOption] = useState(
    localStorage.getItem("sortingOption") || "priority"
  );

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle user interaction and store user preferences in localStorage
  const handleGroupingChange = (option) => {
    setGroupingOption(option);
    localStorage.setItem("groupingOption", option);
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
    localStorage.setItem("sortingOption", option);
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      {/* Add buttons and controls for user interaction */}
      <div className="controls">
        <label>
          Group by:
          <select
            value={groupingOption}
            onChange={(e) => handleGroupingChange(e.target.value)}
          >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          Sort by:
          <select
            value={sortingOption}
            onChange={(e) => handleSortingChange(e.target.value)}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
      <KanbanBoard
        tickets={tickets}
        groupingOption={groupingOption}
        sortingOption={sortingOption}
        users={users1}

      />
    </div>
  );
};

export default App;
