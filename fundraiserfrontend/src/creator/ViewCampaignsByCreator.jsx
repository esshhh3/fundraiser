import { useEffect, useState } from 'react';
import axios from 'axios';


export default function ViewCampaignsByCreator() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const [creatorId, setCreatorId] = useState(null);

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      const creator = JSON.parse(storedCreator);
      setCreatorId(creator.id);
      fetchCampaigns(creator.id);
    }
  }, []);

  const fetchCampaigns = async (creatorId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/creator/viewcampaignsbycreator/${creatorId}`);
      setCampaigns(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch your campaigns');
      setCampaigns([]);
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>My Campaigns</h3>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {campaigns.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No campaigns added yet.</p>
      ) : (
        <table style={{ margin: '0 auto', width: '90%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Campaign ID</th>
              <th>Category</th>
              <th>Title</th>
              <th>Description</th>
              <th>Goal</th>
              <th>Creator Name</th>
              <th>Creator Email</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
               <tr key={campaign.id}>
                 <td>{campaign.id}</td>
                 <td>{campaign.category}</td>
                 <td>{campaign.title}</td>
                 <td>{campaign.description}</td>
                 <td>{campaign.goal}</td>
                 <td>{campaign.creator?.name}</td>
                 <td>{campaign.creator?.email}</td>
               </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
