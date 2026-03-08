import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="home-hero">
        <div className="home-overlay">
          <div className="home-content">
            <h1>ANZEN Emergency Response System</h1>
            <p className="home-subtitle">
              Real-time accident detection and emergency coordination for police
              and hospitals.
            </p>

            <div className="home-buttons">
              <Link to="/register" className="primary-btn">
                Register
              </Link>
              <Link to="/login" className="secondary-btn">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="home-section">
        <h2>About the System</h2>
        <p>
          ANZEN is an accident detection and emergency response platform designed
          to support faster coordination between emergency organizations. The
          system helps identify accident severity, track live location, and send
          alerts to the relevant emergency services.
        </p>
      </section>

      <section className="home-grid-section">
        <h2>Key Features</h2>
        <div className="home-grid">
          <div className="feature-card">
            <h3>Real-Time Alerts</h3>
            <p>Detect accident events instantly and notify emergency teams.</p>
          </div>

          <div className="feature-card">
            <h3>Live Location</h3>
            <p>Track the accident location and open it directly in Google Maps.</p>
          </div>

          <div className="feature-card">
            <h3>Police Dashboard</h3>
            <p>Police teams can review, acknowledge, and respond to alerts.</p>
          </div>

          <div className="feature-card">
            <h3>Hospital Dashboard</h3>
            <p>Hospitals can receive emergency information for rapid response.</p>
          </div>
        </div>
      </section>

      <section className="home-grid-section">
        <h2>Supported Emergency Services</h2>
        <div className="home-grid">
          <div className="service-card">
            <h3>Police</h3>
            <p>Monitor alerts, confirm incidents, and coordinate field response.</p>
          </div>

          <div className="service-card">
            <h3>Hospitals</h3>
            <p>Prepare medical response based on severity and passenger count.</p>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <h2>Get Started</h2>
        <p>Register your emergency organization or log in to access the dashboard.</p>
        <div className="home-buttons center">
          <Link to="/register" className="primary-btn">
            Create Account
          </Link>
          <Link to="/login" className="secondary-btn">
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}