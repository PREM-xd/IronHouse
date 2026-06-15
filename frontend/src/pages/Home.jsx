import React,
{
  useState,
  useEffect,
  useRef
} from "react";import axios from "axios";
export default function Home() {
  const token = localStorage.getItem("token");
  const [height, setHeight] = useState('');
const [weight, setWeight] = useState('');
const [plans, setPlans] = useState([]);
const messagesEndRef =
  useRef(null);

const [chatLoading,
  setChatLoading] =
  useState(false);
useEffect(() => {
  fetchPlans();
}, []);
const [chatMessages, setChatMessages] =
  useState([
    {
      role: "assistant",
      content:
        "Hello! I'm IronHouse Coach AI. Ask me anything about workouts, nutrition, fat loss, muscle gain, supplements, or recovery."
    }
  ]);
useEffect(() => {

  messagesEndRef
    .current
    ?.scrollIntoView({
      behavior: "smooth"
    });

}, [chatMessages]);
const [age, setAge] = useState("");
const [gender, setGender] = useState("");
const [experience, setExperience] = useState("");
const [bench, setBench] = useState("");
const [squat, setSquat] = useState("");
const [deadlift, setDeadlift] = useState("");
const [goal, setGoal] = useState("");
const [aiPlan, setAiPlan] =
  useState(null);

const [loading, setLoading] =
  useState(false);
const [chatOpen, setChatOpen] =
  useState(false);

const [question, setQuestion] =
  useState("");



const handleBuyMembership =
  async (membershipId) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {

        window.location.href =
          "/login";

        return;
      }

      const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user-memberships/payment-order/${membershipId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const {
        order,
        key,
      } = response.data;

      const options = {
        key,

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "Iron House",

        description:
          "Gym Membership",

        order_id:
          order.id,

handler: async function (

    response

  ) {

    try {

      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/user-memberships/verify-payment`,

        {

          razorpay_order_id:

            response.razorpay_order_id,

          razorpay_payment_id:

            response.razorpay_payment_id,

          razorpay_signature:

            response.razorpay_signature,

          membershipId,

        },

        {

          headers: {

            Authorization:

              `Bearer ${token}`,

          },

        }

      );

      alert(

        "Membership Activated Successfully"

      );

    } catch (error) {

      alert(

        "Verification Failed"

      );

    }

  },

};
const razorpay =
  new window.Razorpay(options);

razorpay.open();

} catch (error) {

  console.log(error);

  alert(
    error.response?.data?.message ||
    "Payment Failed"
  );

}
};



  
const fetchPlans = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/memberships`
    );

    console.log("API URL:", import.meta.env.VITE_API_URL);
    console.log("Response:", response.data);

    setPlans(
      Array.isArray(response.data)
        ? response.data
        : []
    );

  } catch (error) {
    console.log("Membership Error:", error);
  }
};

 
const generateFitnessPlan =
  async () => {

    try {

      setLoading(true);

      const response =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/ai/fitness-plan`,
          {
            age,
            gender,
            height,
            weight,
            experience,
            bench,
            squat,
            deadlift,
            goal,
          }
        );

    const cleanResponse =
  response.data.plan
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

setAiPlan(
  JSON.parse(
    cleanResponse
  )
);
    } catch (error) {

      alert(
        "Failed to generate plan"
      );

    } finally {

      setLoading(false);

    }
};

const askCoachAI = async () => {

  if (!question) return;

  const userMessage = {
    role: "user",
    content: question,
  };

  setChatMessages(prev => [
    ...prev,
    userMessage,
  ]);

  setQuestion("");
  setChatLoading(true);

  try {

    const response =
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat/ask`,
        {
          question,
        }
      );

    setChatMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: response.data.answer,
      },
    ]);

  } catch (error) {

    console.log(error);

  } finally {

    setChatLoading(false);

  }

};
return (
    <>
     <nav className="navbar">

  <div className="logo">

    Iron<span>House</span>

  </div>

  <ul className="nav-links">

    <li><a href="#programs">Programs</a></li>

    <li><a href="#trainers">Coaches</a></li>

    <li><a href="#pricing">Memberships</a></li>

    <li><a href="#testimonials">Results</a></li>

  </ul>
<div className="nav-right">

  {token && (

    <a
      href="/dashboard"
      className="nav-auth"
    >
      Dashboard
    </a>

  )}
  {token ? (
    <>
      <a href="/book-trial" className="nav-auth">
        Book Trial
      </a>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <a href="/login" className="nav-auth">
        Login
      </a>

      <a href="/register" className="signup-btn">
        Sign Up
      </a>
    </>
  )}

</div>

</nav>

      <section className="hero" id="home">
        <video

    autoPlay

    muted

    loop

    playsInline

    className="hero-video"

  >

    <source

      src="/videos/gym-video.mp4"

      type="video/mp4"

    />

  </video>

  <div className="hero-overlay"></div>

  <div className="hero-content">

    <h1 className="hero-title">

  BUILT NOT BORN

</h1>

<h2 className="hero-subtitle">

  LIFT HEAVY. LIVE STRONG.

</h2>

<p className="hero-description">

  Where Personal Records Become Reality.
  

</p>

<div className="hero-buttons">

  <a
    href={
      token
        ? "/book-trial"
        : "/login?redirect=book-trial"
    }
  >
    <button className="primary-btn">
      Book Your Free Trial
    </button>
  </a>

</div>

  </div>

</section>

<section className="stats">

  <div className="stat-box">
    <h2>5000+</h2>
    <p>Members</p>
  </div>

  <div className="stat-box">
    <h2>15+</h2>
    <p>Certified Coaches</p>
  </div>

  <div className="stat-box">
    <h2>250+</h2>
    <p>Powerlifters Trained</p>
  </div>

  <div className="stat-box">
    <h2>24/7</h2>
    <p>Gym Access</p>
  </div>

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
      <h3>Aditya Raj</h3>
      <p>Strength Coach</p>
      <span>8 Years Experience</span>
    </div>

    <div className="trainer-card">
      <img src="https://images.unsplash.com/photo-1549476464-37392f717541?w=500" alt="Trainer" />
      <h3>Aryan Verma</h3>
      <p>Fat Loss Specialist</p>
      <span>6 Years Experience</span>
    </div>

    <div className="trainer-card">
      <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500" alt="Trainer" />
      <h3>Aryan Chaudhary</h3>
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

  {plans.map((plan) => (

    <div
      key={plan._id}
      className="price-card"
    >

      <h3>{plan.name}</h3>

      <h1>₹{plan.price}</h1>

      <p>{plan.duration}</p>

      <ul>

        <li>
          {plan.description}
        </li>

      </ul>

      <button
  onClick={() =>
    handleBuyMembership(
      plan._id
    )
  }
>
  Join Now
</button>

    </div>

  ))}

</div>
</section>


<section className="bmi-section">

  <div className="section-title">

    <h2>
      IronHouse AI Fitness Planner
    </h2>

    <p>
      Get your personalized
      fitness and nutrition plan
      powered by AI.
    </p>

  </div>

  <div className="bmi-card">

    <input
      type="number"
      placeholder="Age"
      value={age}
      onChange={(e) =>
        setAge(e.target.value)
      }
    />

    <select
      value={gender}
      onChange={(e) =>
        setGender(e.target.value)
      }
    >
      <option value="">
        Select Gender
      </option>

      <option value="Male">
        Male
      </option>

      <option value="Female">
        Female
      </option>
    </select>

    <input
      type="number"
      placeholder="Height (cm)"
      value={height}
      onChange={(e) =>
        setHeight(
          e.target.value
        )
      }
    />

    <input
      type="number"
      placeholder="Weight (kg)"
      value={weight}
      onChange={(e) =>
        setWeight(
          e.target.value
        )
      }
    />

    <input
      type="text"
      placeholder="Experience (e.g. Beginner, 1 Year)"
      value={experience}
      onChange={(e) =>
        setExperience(
          e.target.value
        )
      }
    />

    <input
      type="text"
      placeholder="Bench Press"
      value={bench}
      onChange={(e) =>
        setBench(
          e.target.value
        )
      }
    />

    <input
      type="text"
      placeholder="Squat"
      value={squat}
      onChange={(e) =>
        setSquat(
          e.target.value
        )
      }
    />

    <input
      type="text"
      placeholder="Deadlift"
      value={deadlift}
      onChange={(e) =>
        setDeadlift(
          e.target.value
        )
      }
    />

    <select
      value={goal}
      onChange={(e) =>
        setGoal(
          e.target.value
        )
      }
    >
      <option value="">
        Select Goal
      </option>

      <option value="Fat Loss">
        Fat Loss
      </option>

      <option value="Muscle Gain">
        Muscle Gain
      </option>

      <option value="Bodybuilding">
        Bodybuilding
      </option>

      <option value="Powerlifting">
        Powerlifting
      </option>
    </select>

    <button
      className="primary-btn"
      onClick={
        generateFitnessPlan
      }
    >
      {
        loading
          ? "Generating..."
          : "Generate AI Plan"
      }
    </button>


{aiPlan && (

<>
  <div className="ai-results">

  <div className="ai-card">
    <h3>Fitness Score</h3>
    <p>{aiPlan.fitnessScore}</p>
  </div>

  <div className="ai-card">
    <h3>Maintenance</h3>
    <p>{aiPlan.maintenanceCalories}</p>
  </div>

  <div className="ai-card">
    <h3>Target Calories</h3>
    <p>{aiPlan.recommendedCalories}</p>
  </div>

  <div className="ai-card">
    <h3>Protein</h3>
    <p>{aiPlan.protein}</p>
  </div>

    <div className="ai-card">
      <h3>Carbs</h3>
      <p>{aiPlan.carbs}</p>
    </div>

    <div className="ai-card">
      <h3>Fats</h3>
      <p>{aiPlan.fats}</p>
    </div>

    <div className="ai-card">
      <h3>Workout Split</h3>
      <p>{aiPlan.workoutSplit}</p>
    </div>

    <div className="ai-card">
      <h3>Cardio</h3>
      <p>{aiPlan.cardio}</p>
    </div>

  </div>

  <div className="ai-advice-card">
    <h3>
  AI Coach Advice
</h3>

<span className="goal-badge">
  {goal}
</span>
    <p>{aiPlan.advice}</p>
  </div>

</>

)}



  </div>

</section>

<section className="testimonials">

  <div className="section-title">
    <h2>Testimonials</h2>
    <p>See what our members say about FitZone.</p>
  </div>

  <div className="testimonial-cards">

    <div className="testimonial-card">
    <h3>15 KG LOST</h3>
      <p>
        Lost 15kg in 6 months thanks to the trainers and nutrition guidance.
      </p>
      <span>- Amit Sharma</span>
    </div>

    <div className="testimonial-card">
    <h3>+40 KG BENCH</h3>
      <p>
        The best gym experience I've had. Great equipment and amazing staff.
      </p>
      <span>- Priya Gupta</span>
    </div>

    <div className="testimonial-card">
      <h3>STATE LEVEL POWERLIFTER</h3>
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
     
     <div
  className="chat-bubble"
  onClick={() =>
    setChatOpen(
      !chatOpen
    )
  }
>
  💬
</div>

{chatOpen && (

<div
  className="chat-window"
>

  <div
    className="chat-header"
  >
    IronHouse Coach AI
  </div>

<div className="chat-messages">

  {chatMessages.map(
    (msg, index) => (

      <div
        key={index}
        className={
          msg.role === "user"
            ? "user-msg"
            : "bot-msg"
        }
      >
        {msg.content}
      </div>

    )
  )}

  {chatLoading && (
    <div className="bot-msg">
      Thinking...
    </div>
  )}

  <div ref={messagesEndRef}></div>

</div>

<div className="chat-input">

  <input
    type="text"
    placeholder="Ask a question..."
    value={question}
    onChange={(e) =>
      setQuestion(
        e.target.value
      )
    }
    onKeyDown={(e) => {

      if (
        e.key === "Enter"
      ) {

        askCoachAI();

      }

    }}
  />

  <button
    onClick={askCoachAI}
    disabled={chatLoading}
  >
    {
      chatLoading
        ? "..."
        : "Send"
    }
  </button>

</div>

</div>

)}
    </>
  );
}
