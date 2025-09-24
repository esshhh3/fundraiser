import { useState } from 'react';
import './donor.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';

export default function DonorLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const navigate = useNavigate();
  const { setIsDonorLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/donor/checkdonorlogin`, formData);

      if (response.status === 200) {
        setIsDonorLoggedIn(true);
        sessionStorage.setItem('donor', JSON.stringify(response.data));
        navigate('/donorhome');
      } else {
        setMessage(response.data);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Donor Login</h3>
      {
        message
          ? <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bolder' }}>{message}</p>
          : <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bolder' }}>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
       
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}
