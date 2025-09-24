import { useState, useEffect } from 'react';
import './DonorHome.css'; // Import the CSS file
import img1 from './createaccount.png';
import img2 from './findyourtutor.png';
import img3 from './bookasession.png';

export default function DonorHome() {
  const [donor, setDonor] = useState("");

  useEffect(() => {
    const storedDonor = sessionStorage.getItem('donor');
    if (storedDonor) {
      setDonor(JSON.parse(storedDonor));
    }
  }, []);

  return (
    <div className="donor-home">
      <div className="welcome-container">
        <h3 className="welcome-message">Hello, {donor.name}!</h3>
      </div>
    </div>
  );
}
