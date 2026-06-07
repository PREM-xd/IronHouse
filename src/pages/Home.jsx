import React, { useState } from 'react';

export default function Home() {
  const [height, setHeight] = useState('');
const [weight, setWeight] = useState('');
 const calculateBMI = () => {
  if (!height || !weight) {
    return {
      bmi: "--",
      category: "Enter your details",
      advice: "Fill in your height and weight."
    };
  }

  const h = height / 100;
  const bmi = (weight / (h * h)).toFixed(1);

  let category = "";
  let advice = "";

  if (Number(bmi) < 18.5) {
    category = "Underweight";
    advice =
      "Focus on eating more calories, increasing protein intake, and following a structured strength-training program.";
  } else if (Number(bmi)  < 25) {
    category = "Normal Weight";
    advice =
      "Excellent! Maintain your current lifestyle with regular exercise and a balanced diet.";
  } else if (Number(bmi)  < 30) {
    category = "Overweight";
    advice =
      "Consider increasing daily activity, improving food quality, and creating a moderate calorie deficit.";
  } else {
    category = "Obese";
    advice =
      "Focus on gradual fat loss through proper nutrition, regular exercise, and healthy habits.";
  }

  return {
    bmi,
    category,
    advice
  };
};
const bmiData = calculateBMI();
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
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Sign Up</a></li>
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

     <section className="programs" id="programs">

  <div className="section-title">
    <h2>Our Programs</h2>
    <p>Choose the perfect training program for your fitness goals.</p>
  </div>

  <div className="program-cards">

    <div className="program-card">
      <h3>🏋️ Strength Training</h3>
      <p>Build muscle, increase power and improve overall performance.</p>
    </div>

    <div className="program-card">
      <h3>🔥 Fat Loss</h3>
      <p>Burn calories efficiently and achieve a lean physique.</p>
    </div>

    <div className="program-card">
      <h3>💪 Bodybuilding</h3>
      <p>Develop size, symmetry and muscle definition.</p>
    </div>

    <div className="program-card">
      <h3>⚡ CrossFit</h3>
      <p>High-intensity workouts to improve strength and endurance.</p>
    </div>

    <div className="program-card">
      <h3>🥗 Nutrition Coaching</h3>
      <p>Customized diet plans to maximize your results.</p>
    </div>

    <div className="program-card">
      <h3>👤 Personal Training</h3>
      <p>One-on-one coaching tailored to your specific goals.</p>
    </div>

  </div>

</section>
<section className="why-us">

  <div className="section-title">
    <h2>Why Choose FitZone?</h2>
    <p>Everything you need to transform your body and lifestyle.</p>
  </div>

  <div className="features">

    <div className="feature">
      <h3>✅ Modern Equipment</h3>
      <p>State-of-the-art machines and free weights.</p>
    </div>

    <div className="feature">
      <h3>✅ Expert Trainers</h3>
      <p>Certified professionals guiding your fitness journey.</p>
    </div>

    <div className="feature">
      <h3>✅ Personalized Plans</h3>
      <p>Workout programs designed for your goals.</p>
    </div>

    <div className="feature">
      <h3>✅ Nutrition Support</h3>
      <p>Meal planning and diet guidance for faster progress.</p>
    </div>

  </div>

</section>
 <section className="trainers" id="trainers">

  <div className="section-title">
    <h2>Meet Our Trainers</h2>
    <p>Train with experienced fitness professionals.</p>
  </div>

  <div className="trainer-cards">

    <div className="trainer-card">
      <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500" alt="Trainer" />
      <h3>Rahul Sharma</h3>
      <p>Strength Coach</p>
      <span>8 Years Experience</span>
    </div>

    <div className="trainer-card">
      <img src="https://images.unsplash.com/photo-1549476464-37392f717541?w=500" alt="Trainer" />
      <h3>Priya Verma</h3>
      <p>Fat Loss Specialist</p>
      <span>6 Years Experience</span>
    </div>

    <div className="trainer-card">
      <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500" alt="Trainer" />
      <h3>Aman Singh</h3>
      <p>Bodybuilding Coach</p>
      <span>10 Years Experience</span>
    </div>

  </div>

</section>
<section className="pricing" id="pricing">

  <div className="section-title">
    <h2>Membership Plans</h2>
    <p>Choose the plan that fits your fitness journey.</p>
  </div>

  <div className="pricing-cards">

    <div className="price-card">
      <h3>Basic</h3>
      <h1>₹999</h1>
      <p>/month</p>

      <ul>
        <li>✔ Gym Access</li>
        <li>✔ Locker Access</li>
        <li>✔ Basic Support</li>
      </ul>

      <button>Join Now</button>
    </div>

    <div className="price-card featured">
      <h3>Premium</h3>
      <h1>₹1999</h1>
      <p>/month</p>

      <ul>
        <li>✔ Everything in Basic</li>
        <li>✔ Group Classes</li>
        <li>✔ Nutrition Guide</li>
        <li>✔ Cardio Zone</li>
      </ul>

      <button>Most Popular</button>
    </div>

    <div className="price-card">
      <h3>Elite</h3>
      <h1>₹3499</h1>
      <p>/month</p>

      <ul>
        <li>✔ Personal Trainer</li>
        <li>✔ Diet Plan</li>
        <li>✔ Priority Support</li>
        <li>✔ Full Gym Access</li>
      </ul>

      <button>Join Now</button>
    </div>

  </div>

</section>

<section className="bmi-section">

  <div className="section-title">
    <h2>BMI Calculator</h2>
    <p>Check your Body Mass Index and receive personalized guidance.</p>
  </div>

  <div className="bmi-card">

    <input
      type="number"
      placeholder="Height (cm)"
      value={height}
      onChange={(e) => setHeight(e.target.value)}
    />

    <input
      type="number"
      placeholder="Weight (kg)"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
    />

    <div className="bmi-display">
      <h1>{bmiData.bmi}</h1>
      <h3>{bmiData.category}</h3>
    </div>

    <div className="bmi-advice">
      <h4>Health Advice</h4>
      <p>{bmiData.advice}</p>
    </div>

  </div>

</section>

<section className="testimonials">

  <div className="section-title">
    <h2>Testimonials</h2>
    <p>See what our members say about FitZone.</p>
  </div>

  <div className="testimonial-cards">

    <div className="testimonial-card">
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        Lost 15kg in 6 months thanks to the trainers and nutrition guidance.
      </p>
      <span>- Amit Sharma</span>
    </div>

    <div className="testimonial-card">
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        The best gym experience I've had. Great equipment and amazing staff.
      </p>
      <span>- Priya Gupta</span>
    </div>

    <div className="testimonial-card">
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        Increased my strength dramatically and built confidence.
      </p>
      <span>- Rahul Verma</span>
    </div>

  </div>

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
