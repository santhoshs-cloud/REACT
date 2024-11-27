import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Profile({ user, onUpdate }) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(user);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(profileData);
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {!editMode ? (
        <div className="profile-info">
          <p><span>Name:</span> {user.name}</p>
          <p><span>Email:</span> {user.email}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
          />

          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
}

export default Profile;
