import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function BookCampaign() 
{
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const campaignId = queryParams.get('campaignid'); // changed from eventid

  const [donor, setDonor] = useState(null);
  const [formData, setFormData] = useState({
    startdate: '',
    enddate: '',
    bookedcapacity: 1
  });

  useEffect(() => {
    const storedDonor = sessionStorage.getItem("donor"); // changed from customer
    if (storedDonor) {
      setDonor(JSON.parse(storedDonor));
    } else {
      alert("Donor not logged in!");
      navigate('/donorlogin'); // changed path
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      campaign: { id: campaignId }, // changed from event
      donor: { id: donor.id },      // changed from customer
      ...formData,
      status: 1
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/donor/bookcampaign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (response.ok) {
        alert("Campaign booked successfully!");
        navigate('/bookedcampaigns'); // changed path
      } else {
        alert("Failed to book campaign.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Book Campaign</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
        <div>
          <label>Start Date: </label>
          <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} required />
        </div>
        <div>
          <label>End Date: </label>
          <input type="date" name="enddate" value={formData.enddate} onChange={handleChange} required />
        </div>
        <div>
          <label>Capacity: </label>
          <input type="number" name="bookedcapacity" min="1" value={formData.bookedcapacity} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button type="submit">Confirm Booking</button>
        </div>
      </form>
    </div>
  );
}
