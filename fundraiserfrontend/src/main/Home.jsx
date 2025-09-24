import './style.css';
import heroImage from './homepageimage.png'; // Replace with your image path

export default function Home() {
  return (
    <div className="home-hero-container">
      <div className="hero-content">
        <span className="hero-tag">Make an impact</span>
        <h1 className="hero-title">Connect, Fund, and Make an Impact
</h1>
        <p className="hero-subtitle">
          Create campaigns for personal, social, or business causes. Set goals, share details, and track contributions effortlessly. Donors can browse campaigns, give securely, and follow progress, while transparent reporting and success stories build trust and celebrate every achievement.
        </p>

      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Tutoring session" />
      </div>
    </div>
  );
}
