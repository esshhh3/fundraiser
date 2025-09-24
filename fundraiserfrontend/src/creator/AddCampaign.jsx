import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddCampaign() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    goal: ''
  });

  const [creator, setCreator] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      setCreator(JSON.parse(storedCreator));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const campaignData = {
      ...formData,
      creator_id: creator.id // from session storage
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/creator/addcampaign`,
        campaignData
      );
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          category: '',
          title: '',
          description: '',
          goal: ''
        });
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add New Campaign</h3>
      {message ? (
        <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p>
      ) : (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category</label>
          <input type="text" id="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Goal</label>
          <input type="number" step="0.01" id="goal" value={formData.goal} onChange={handleChange} required />
        </div>
        <button type="submit">Add Campaign</button>
      </form>
    </div>
  );
}
