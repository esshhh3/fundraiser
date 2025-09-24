import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './creator.css';
import CreatorHome from './CreatorHome';
import CreatorProfile from './CreatorProfile';
import CreatorLogin from './CreatorLogin';
import { useAuth } from '../contextapi/AuthContext';
import AddCampaign from './AddCampaign';
import ViewCampaignsByCreator from './ViewCampaignsByCreator';
import ViewBookings from './ViewBookings';

export default function CreatorNavBar() 
{
  const { setIsCreatorLoggedIn } = useAuth(); 

  const handleLogout = () => 
  {
    setIsCreatorLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Creator</div>
        <ul className="nav-links">
          <li><Link to="/creatorhome">Home</Link></li>
          <li><Link to="/creatorprofile">Creator Profile</Link></li>
          <li><Link to="/addcampaign">Add New Campaign</Link></li>
          <li><Link to="/viewcampaignsbycreator">View Campaigns</Link></li>
          <li><Link to="/viewbookings">View Bookings</Link></li>
          <li><Link to="/creatorlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/creatorhome" element={<CreatorHome />} exact />
        <Route path="/creatorprofile" element={<CreatorProfile />} exact />
        <Route path="/addcampaign" element={<AddCampaign />} exact />
        <Route path="/viewcampaignsbycreator" element={<ViewCampaignsByCreator />} exact />
        <Route path="/viewbookings" element={<ViewBookings />} exact />
        <Route path="/creatorlogin" element={<CreatorLogin />} exact />
      </Routes>
    </div>
  );
}
