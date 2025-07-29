import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';
import { useNavigate } from 'react-router-dom';
const UserForm = ({ onUserAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    points: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    const pointsValue = parseFloat(formData.points) || 0;

    try {
      setIsSubmitting(true);
      const response = await axios.post('http://localhost:5000/api/users', {
        name: formData.name,
        points: pointsValue
      });

      setSuccess(`User "${response.data.name}" added successfully!`);
      setFormData({ name: '', points: '' });
      
      // Notify parent component to refresh user list
      if (onUserAdded) {
        onUserAdded();
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter user name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="points">Points:</label>
          <input
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleChange}
            placeholder="Enter points (default: 0)"
            min="0"
            step="0.01"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;