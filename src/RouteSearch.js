import React, { useState } from 'react';
import './App.css';

function RouteSearch({ onSearch }) {
  const [searchData, setSearchData] = useState({
    date: '',
    train: 'train1'
  });

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  return (
    <div className="route-search-container">
      <h2>Search for Routes</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="train">Select Train:</label>
        <select
          id="train"
          name="train"
          value={searchData.train}
          onChange={handleChange}
          required
        >
          <option value="train1">Train 1 - Express</option>
          <option value="train2">Train 2 - Superfast</option>
          <option value="train3">Train 3 - Passenger</option>
        </select>

        <label htmlFor="date">Travel Date:</label>
<input
  type="date"
  id="date"
  name="date"
  value={searchData.date}
  onChange={handleChange}
  required
  min={new Date().toISOString().split("T")[0]} // Restricts to upcoming dates
/>

        <button type="submit">Search Routes</button>
      </form>
    </div>
  );
}

export default RouteSearch;
