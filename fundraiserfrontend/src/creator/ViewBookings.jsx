import { useEffect, useState } from 'react';
import axios from 'axios';


export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [creatorId, setCreatorId] = useState(null);

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      const creator = JSON.parse(storedCreator);
      setCreatorId(creator.id);
      fetchBookings(creator.id);
    } else {
      setError('Creator not logged in.');
    }
  }, []);

  const fetchBookings = async (creatorId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/creator/viewbookingsbycreator/${creatorId}`);
      setBookings(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch bookings');
      setBookings([]);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
       const response = await axios.get(`${import.meta.env.VITE_API_URL}/creator/updatebookingstatus`, {
        params: { id: bookingId, status: status }
      });
      alert(response.data);
      fetchBookings(creatorId); // Refresh the bookings list
    } catch (err) {
      alert('Failed to update booking status');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Bookings for My Campaigns</h3>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No bookings available for your campaigns.</p>
      ) : (
        <table style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Booking ID</th>
              <th>Campaign ID</th>
              <th>Campaign Title</th>
              <th>Donor Name</th>
              <th>Donor Email</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Booked Capacity</th>
              <th>Status</th>
              <th>Booking Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.id}</td>
                <td>{booking.campaign.id}</td>
                <td>{booking.campaign.title}</td>
                <td>{booking.donor.name}</td>
                <td>{booking.donor.email}</td>
                <td>{booking.startdate}</td>
                <td>{booking.enddate}</td>
                <td>{booking.bookedcapacity}</td>
                <td>{booking.status}</td>
                <td>{new Date(booking.bookingtime).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => updateStatus(booking.id, 'ACCEPTED')}
                    style={{ marginRight: '5px', backgroundColor: 'green', color: 'white' }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(booking.id, 'REJECTED')}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
