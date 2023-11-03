import React, { useState } from "react";
import dummy from "../assets/json/dummy-data.json";
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
    if (value === "rank" || value === "organization" || value === "partner")
      return;
    if (sortKey === value) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Otherwise, set the sort key to the header value and the order to ascending
      setSortKey(value);
      setSortOrder("asc");
    }
  };

  return (
    <th onClick={handleClick} className={`${value === "rank" || value === "organization" || value === "partner" ? "text-left cursor-default" : "text-center cursor-pointer"}`}>
      {label}
      {/* Display an arrow icon based on the sort key and order */}
      {sortKey === value && (
        <span className="material-icons">
          {/* {setSortOrder === "asc" ? "arrow_drop_up" : "arrow_drop_down"} */}
        </span>
      )}
    </th>
  );
};

// A custom component to display the table row with the data
const Row = ({ rank, logo, organization, past30Days, allTime, targetNumber, currentNumber }) => {
  return (
    <tr key={rank}>
      <td>{rank}</td>
      <td>
        {/* <Logo src={logo} alt={organization} /> */}
        {organization ?? "haha"}
      </td>
      <td className="text-center">{currentNumber ?? past30Days}</td>
      <td className="text-center">{targetNumber ?? allTime}</td>
    </tr>
  );
};

// The main app component
function Leaderboard({ leaderboardData }) {
  // The state variables for the data, sort key and sort order
  // const [data, setData] = useState(leaderboardData ?? dummy);
  const data = leaderboardData ?? dummy;
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
  // useEffect(() => {
  //   fetch("../assets/json/dummy-data.json")
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  return (
    <div className="leaderboard-container lg:min-w-[1000px] py-10">
      <h1 className="font-semibold text-5xl pb-5"> {leaderboardData ? "Leaderboard" : " Global Leaderboard"}</h1>
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
              label="Partner"
              value="partner"
              sortKey={sortKey}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
            />
            <Header
              label={leaderboardData ? "Current Progress" : "Past 30 Days"}
              value="past30days"
              sortKey={sortKey}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
            />
            <Header
              label={leaderboardData ? "Target Number" : "All Time"}
              value="alltime"
              sortKey={sortKey}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
            />
          </tr>
        </thead>

        <tbody>

          {data.sort(compare).map((item, index) => (
            <Row key={index + 1} rank={index + 1} {...item}  organization={item.username ?? item.organization} />
          ))}
        </tbody>
      </table>
      {
        data.length === 0 && <div className="w-full flex justify-center items-center"><p className="mt-20"> No Partner Registered Yet</p></div>
      }
    </div>
  );
}

export default Leaderboard;
