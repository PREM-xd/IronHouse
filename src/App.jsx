import React from 'react';
export default function App() {
  return (
    <>
      <nav className="navbar">
  <div className="logo">
    Fit<span>Zone</span>
  </div>

  <ul className="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#programs">Programs</a></li>
    <li><a href="#trainers">Trainers</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  <button className="join-btn">
    Join Now
  </button>
</nav>

      <section className="hero" id="home">
        <h1>Transform Your Body</h1>
        <p>Build strength, confidence and fitness.</p>
        <button>Join Now</button>
      </section>

     

      <footer className="footer">
  <div className="footer-container">

    <div className="footer-section">
      <h2>Fit<span>Zone</span></h2>
      <p>
        Transform your body and achieve your fitness goals with
        world-class training and expert guidance.
      </p>
    </div>

    <div className="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#programs">Programs</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h3>Contact</h3>
      <p>📍 Mumbai, India</p>
      <p>📞 +91 9876543210</p>
      <p>✉ info@fitzone.com</p>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 FitZone Gym. All Rights Reserved.</p>
  </div>
</footer>

    </>
  );
}
