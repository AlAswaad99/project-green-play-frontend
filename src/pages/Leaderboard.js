import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

// A custom component to display the logo in a circle
const Logo = ({ src, alt }) => {
  return (
    <div className="logo-container">
      <img className="logo" src={src} alt={alt} />
    </div>
  );
};

// A custom component to display the table header with sorting functionality
const Header = ({ label, value, sortKey, setSortKey, setSortOrder }) => {
  // A function to handle the click event on the header
  const handleClick = () => {
    // If the header is already sorted, toggle the order
    if (sortKey === value) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Otherwise, set the sort key to the header value and the order to ascending
      setSortKey(value);
      setSortOrder("asc");
    }
  };

  return (
    <th onClick={handleClick}>
      {label}
      {/* Display an arrow icon based on the sort key and order */}
      {sortKey === value && (
        <span className="material-icons">
          {setSortOrder === "asc" ? "arrow_drop_up" : "arrow_drop_down"}
        </span>
      )}
    </th>
  );
};

// A custom component to display the table row with the data
const Row = ({ rank, logo, organization, past30days, alltime }) => {
  return (
    <tr>
      <td>{rank}</td>
      <td>
        <Logo src={logo} alt={organization} />
        {organization}
      </td>
      <td>{past30days}</td>
      <td>{alltime}</td>
    </tr>
  );
};

// The main app component
function Leaderboard() {
  // The state variables for the data, sort key and sort order
  const [data, setData] = useState([]);
  const [sortKey, setSortKey] = useState("alltime");
  const [sortOrder, setSortOrder] = useState("desc");

  // A function to compare two objects based on the sort key and order
  const compare = (a, b) => {
    if (a[sortKey] > b[sortKey]) {
      return sortOrder === "asc" ? 1 : -1;
    } else if (a[sortKey] < b[sortKey]) {
      return sortOrder === "asc" ? -1 : 1;
    } else {
      return 0;
    }
  };

  // A useEffect hook to fetch the data from the local JSON file
  useEffect(() => {
    fetch("../assets/json/dummy-data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      {/* Display the table with the sorted data */}
      <table>
        <thead>
          <tr>
            <Header
              label="#"
              value="rank"
              sortKey={sortKey}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
            />
            <Header
              label="Organization"
              value="organization"
              sortKey={sortKey}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
            />
            <Header
              label="Past 30 Days"
              value="past30days"
              sortKey={sortKey}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
            />
            <Header
              label="All Time"
              value="alltime"
              sortKey={sortKey}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
            />
          </tr>
        </thead>
        <tbody>
          {data.sort(compare).map((item) => (
            <Row key={item.rank} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
