import { useState } from 'react';
import axios from 'axios';

import './style.css'; // Shared CSS styling

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
    email: '',
    mobileno: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/sendemail`, formData);
      setMessage(response.data);
      setError('');

      // Clear the form
      setFormData({
        name: '',
        subject: '',
        message: '',
        email: '',
        mobileno: '',
        location: ''
      });
    } catch (err) {
      setError('Failed to send email');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="form-title">Contact Us</h2>
      {message && <p className="form-message success">{message}</p>}
      {error && <p className="form-message error">{error}</p>}

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input type="text" id="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Message</label>
          <input type="text" id="message" value={formData.message} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Mobile No</label>
          <input type="number" id="mobileno" value={formData.mobileno} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required />
        </div>
        <button type="submit" className="register-button">Submit</button>
      </form>
    </div>
  );
}
