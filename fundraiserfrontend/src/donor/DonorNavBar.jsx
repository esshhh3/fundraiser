import { Routes, Route, Link } from 'react-router-dom';
import './donor.css';
import DonorHome from './DonorHome';
import DonorProfile from './DonorProfile';
import DonorLogin from './DonorLogin';
import { useAuth } from '../contextapi/AuthContext';
import UpdateProfile from './UpdateProfile';
import BookedCampaigns from './BookedCampaigns';
import ViewAllCampaigns from './ViewAllCampaigns';
import BookCampaign from './BookCampaign';

export default function DonorNavBar() 
{
  const { setIsDonorLoggedIn } = useAuth(); 

  const handleLogout = () => 
 {
    setIsDonorLoggedIn(false);
    sessionStorage.clear()
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Donor</div>
        <ul className="nav-links">
          <li><Link to="/donorhome">Home</Link></li>
          <li><Link to="/donorprofile">Donor Profile</Link></li>
          <li><Link to="/updateprofile">Update Profile</Link></li>
          <li><Link to="/viewallcampaigns">Book a New Campaign</Link></li>
          <li><Link to="/bookedcampaigns">Booked Campaigns</Link></li>
          <li><Link to="/donorlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/donorhome" element={<DonorHome />} exact />
        <Route path="/donorprofile" element={<DonorProfile />} exact />
        <Route path="/updateprofile" element={<UpdateProfile/>} exact />
        <Route path="/viewallcampaigns" element={<ViewAllCampaigns/>} exact />
        <Route path="/bookcampaign" element={<BookCampaign/>} />
        <Route path="/bookedcampaigns" element={<BookedCampaigns/>} exact />
        <Route path="/donorlogin" element={<DonorLogin />} exact />
      </Routes>
    </div>
  );
}
