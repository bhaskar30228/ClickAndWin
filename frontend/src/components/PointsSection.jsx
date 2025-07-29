import React, { useState, useEffect } from 'react';
import './PointsSection.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PointsSection = () => {
  const [users, setUsers] = useState([]);
  const [highlightedUser, setHighlightedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://clickandwin-1.onrender.com/api/users');
      const sortedUsers = response.data
        .sort((a, b) => b.points - a.points)
        .map((user, index) => ({
          ...user,
          rank: index + 1,
          delay: index * 0.1
        }));
      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHover = (userId) => {
    setHighlightedUser(userId);
  };

  const handleLeave = () => {
    setHighlightedUser(null);
  };

    const handleUserClick = async (userId) => {
    try {
      await axios.post(`https://clickandwin-1.onrender.com/api/users/${userId}/claim`);
      window.location.reload(); 
    } catch (error) {
      console.error('Error claiming points:', error);
    }
  };


  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <div className="points-container">
      <h2 className="section-title">
        <span className="title-main">LEADERBOARD</span>
        <span className="title-sub">TOP PERFORMERS</span>
      </h2>
      
      <div className="leaderboard-header">
        <span>RANK</span>
        <span>PLAYER</span>
        <span>POINTS</span>
      </div>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="users-list">
          {users.map((user) => (
            <div 
              key={user._id}
              className={`user-card ${highlightedUser === user._id ? 'highlighted' : ''}`}
              style={{ animationDelay: `${user.delay}s` }}
              onMouseEnter={() => handleHover(user._id)}
              onMouseLeave={handleLeave}
              onClick={() => handleUserClick(user._id)}
            >
              <div className="user-rank">
                <span className="rank-number">{user.rank}</span>
                <span className="rank-avatar">{user.avatar || '👤'}</span>
              </div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${(user.points / 2000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="user-points">
                {user.points.toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="leaderboard-footer">
        <button className="refresh-btn" onClick={handleRefresh}>
          🔄 Refresh Rankings
        </button>
      </div>
    </div>
  );
};

export default PointsSection;