import { useState } from 'react';
import './creator.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contextapi/AuthContext';

export default function CreatorLogin() 
{
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsCreatorLoggedIn } = useAuth(); // updated auth context

  const handleChange = (e) => 
  {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
  
    try 
    {
 const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/creator/checkcreatorlogin`,
        formData
      );  
      if(response.status === 200) 
      {
        setIsCreatorLoggedIn(true);
        sessionStorage.setItem('creator', JSON.stringify(response.data)); // session key updated
        navigate("/creatorhome");
      }
      else
      {
         setMessage(response.data);
      }
    } 
    catch (error) 
    {
      if(error.response) 
      {
        setError(error.response.data);
      }
      else 
      {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline"}}>Creator Login</h3>
      {
        message ?
        <p style={{textAlign: "center", color:"green", fontWeight:"bolder"}}>{message}</p> :
        <p style={{textAlign: "center", color:"red", fontWeight:"bolder"}}>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}
