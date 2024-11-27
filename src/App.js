import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import RouteSearch from './RouteSearch';
import SeatSelection from './SeatSelection';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    train: 'train1',
    date: '',
    tickets: 1
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''  
  });
  const [availableSeats, setAvailableSeats] = useState(['A1', 'A2', 'B1', 'B2']); // Example seat data
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  const handleRegister = (userData) => {
    // Perform registration logic here
    setUser(userData);
    setIsRegistered(true);
  };

  const handleLogin = (credentials) => {
    // Perform login logic here
    if (credentials.email === user.email && credentials.password === user.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleUpdateProfile = (updatedData) => {
    // Update user profile logic here
    setUser(updatedData);
  };

  const handleSearch = (searchData) => {
    // Handle route search logic here
    setSearchResults(searchData);
  };

  const handleSelectSeats = (seats) => {
    setSelectedSeats(seats);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    setBookingConfirmed(true);
  };
  const handleClick = () => {
    setBookingConfirmed(false);
    setSearchResults(false);
  }
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/book">Book Ticket</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              !isRegistered ? (
                <Register onRegister={handleRegister} />
              ) : (
                <div>
                  <h2>Registration Successful. Please <Link to="/login">log in</Link>.</h2>
                </div>
              )
            }
          />
          <Route
            path="/login"
            element={
             
                <Login onLogin={handleLogin} />
         
            }
          />
          <Route
            path="/book"
            element={
              isLoggedIn ? (
                !bookingConfirmed ? (
                  <>
                    <RouteSearch onSearch={handleSearch} />
                    {searchResults && (
                      <>
                        <SeatSelection availableSeats={availableSeats} onSelectSeats={handleSelectSeats} />
                        <form onSubmit={handleSubmit}>
                          <label>Name:</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />

                          <label>Email:</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />

                          

                          

                          <label>Number of Tickets:</label>
                          <input
                            type="number"
                            id="tickets"
                            name="tickets"
                            min="1"
                            max="10"
                            value={formData.tickets}
                            onChange={handleChange}
                            required
                          />

                          <button type="submit">Book Ticket</button>
                        </form>
                      </>
                    )}
                  </>
                ) : (
                  <div id="confirmation">
                    <h3>Booking Confirmation</h3>
                    <p>
                      Thank you, {formData.name}! Your booking for {formData.train} on {formData.date} has been confirmed.
                      An email has been sent to {formData.email}. You have booked {formData.tickets} ticket(s) for seats {selectedSeats.join(', ')}.
                    </p>
                    <br/>
                    <button onClick={handleClick}>Back</button>
                  </div>
                )
              ) : (
                <h2>Please log in to book a ticket</h2>
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile user={user} onUpdate={handleUpdateProfile} />
              ) : (
                <h2>Please log in to view your profile</h2>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
