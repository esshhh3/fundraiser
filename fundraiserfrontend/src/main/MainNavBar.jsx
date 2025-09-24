import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './style.css';
import DonorLogin from './../donor/DonorLogin';
import DonorRegistration from './../donor/DonorRegistration';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import CreatorLogin from '../creator/CreatorLogin';
import NotFound from './NotFound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faUserTie, faUserShield } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png'; // Replace with your actual logo path

export default function MainNavBar() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          Crowd Source
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/donorregistration">Register</Link></li>
          <li className="dropdown">
            <span>Login ▾</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/donorlogin">
                  <FontAwesomeIcon icon={faHandHoldingHeart} style={{ marginRight: '8px' }} />
                  Donor
                </Link>
              </li>
              <li>
                <Link to="/creatorlogin">
                  <FontAwesomeIcon icon={faUserTie} style={{ marginRight: '8px' }} />
                  Creator
                </Link>
              </li>
              <li>
                <Link to="/adminlogin">
                  <FontAwesomeIcon icon={faUserShield} style={{ marginRight: '8px' }} />
                  Admin
                </Link>
              </li>
            </ul>
          </li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/donorregistration" element={<DonorRegistration />} exact />
        <Route path="/donorlogin" element={<DonorLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/creatorlogin" element={<CreatorLogin />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}
