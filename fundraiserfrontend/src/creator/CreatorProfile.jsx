import { useState, useEffect } from 'react';

export default function CreatorProfile() {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      setCreator(JSON.parse(storedCreator));
    }
  }, []);

  if (!creator) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '26px', color: '#333', marginBottom: '20px' }}>
        Creator Profile
      </h2>

      <div
        style={{
          backgroundColor: 'lightgrey',
          border: '1px solid black',
          borderRadius: '10px',
          padding: '20px',
          width: '350px',
        }}
      >
        <p><strong>Name:</strong> {creator.name}</p>
        <p><strong>Gender:</strong> {creator.gender}</p>
        <p><strong>Date of Birth:</strong> {creator.dob}</p>
        <p><strong>Email:</strong> {creator.email}</p>
        <p><strong>Username:</strong> {creator.username}</p>
        <p><strong>Mobile No:</strong> {creator.mobileno}</p>
        <p><strong>Company Name:</strong> {creator.company_name}</p>
        <p><strong>Creator Location:</strong> {creator.creator_location}</p>
      </div>
    </div>
  );
}
