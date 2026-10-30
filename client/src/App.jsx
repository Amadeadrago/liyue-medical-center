import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      alert(response.data.message);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setCurrentUser(response.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || "Login failed! Please check your credentials.");
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFCF3', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="card p-4 p-md-5 rounded-4 shadow-lg border-0" style={{ backgroundColor: '#044060', color: '#FFFCF3', width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <span className="text-uppercase small fw-bold" style={{ color: '#BFD6E2', letterSpacing: '2px' }}>✦ LIYUE MEDICAL PORTAL ✦</span>
          <h3 className="fw-bold mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>Log In to Account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input 
              type="email" 
              className="form-control text-white bg-transparent border-secondary py-2"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-bold">Password</label>
            <input 
              type="password" 
              className="form-control text-white bg-transparent border-secondary py-2"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn w-100 py-3 rounded-pill fw-bold text-white shadow mb-3" style={{ backgroundColor: '#790707', border: 'none' }}>
            Log In Now ➔
          </button>
          <div className="text-center">
            <Link to="/register" className="text-decoration-none small text-white-50">
              Don't have an account? Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
      alert(response.data.message || "Registration successful!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed! Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFCF3', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="card p-4 p-md-5 rounded-4 shadow-lg border-0" style={{ backgroundColor: '#044060', color: '#FFFCF3', width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <span className="text-uppercase small fw-bold" style={{ color: '#BFD6E2', letterSpacing: '2px' }}>✦ LIYUE MEDICAL PORTAL ✦</span>
          <h3 className="fw-bold mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>Create an Account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Full Name</label>
            <input 
              type="text" 
              className="form-control text-white bg-transparent border-secondary py-2"
              placeholder="Traveler Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input 
              type="email" 
              className="form-control text-white bg-transparent border-secondary py-2"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-bold">Password</label>
            <input 
              type="password" 
              className="form-control text-white bg-transparent border-secondary py-2"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn w-100 py-3 rounded-pill fw-bold text-white shadow mb-3" style={{ backgroundColor: '#790707', border: 'none' }}>
            Register Now ➔
          </button>
          <div className="text-center">
            <Link to="/login" className="text-decoration-none small text-white-50">
              Already have an account? Log in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function ScheduledAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newComplaint, setNewComplaint] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(saved);
  }, []);

  // Cancel Appointment
  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const updated = appointments.filter(app => app.id !== id);
      setAppointments(updated);
      localStorage.setItem('appointments', JSON.stringify(updated));
      alert("Appointment has been cancelled.");
    }
  };

  // Start Rescheduling
  const handleStartEdit = (app) => {
    setEditingId(app.id);
    setNewDate(app.date);
    setNewComplaint(app.complaint);
  };

  // Save Reschedule
  const handleSaveEdit = (id) => {
    if (!newDate) {
      alert("Please select a new date!");
      return;
    }

    const updated = appointments.map(app => {
      if (app.id === id) {
        return { ...app, date: newDate, complaint: newComplaint };
      }
      return app;
    });

    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    setEditingId(null);
    alert("Appointment successfully rescheduled!");
  };

  return (
    <div style={{ backgroundColor: '#FFFCF3', minHeight: '100vh', padding: '100px 20px 40px 20px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="fw-bold mb-4" style={{ color: '#044060', fontFamily: 'Playfair Display, serif' }}>My Scheduled Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-muted">You have no scheduled appointments yet.</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {appointments.map(app => (
              <div key={app.id} className="p-4 rounded-4 shadow-sm text-white" style={{ backgroundColor: '#044060' }}>
                <h5 className="fw-bold" style={{ color: '#BFD6E2' }}>{app.doctor}</h5>
                <p className="mb-1"><strong>Patient:</strong> {app.patientName}</p>

                {editingId === app.id ? (
                  <div className="my-3 p-3 rounded bg-white bg-opacity-10">
                    <div className="mb-2">
                      <label className="small fw-bold">New Date:</label>
                      <input 
                        type="date" 
                        className="form-control text-white bg-transparent border-secondary" 
                        value={newDate} 
                        onChange={(e) => setNewDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="small fw-bold">New Complaint / Notes:</label>
                      <input 
                        type="text" 
                        className="form-control text-white bg-transparent border-secondary" 
                        value={newComplaint} 
                        onChange={(e) => setNewComplaint(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-sm btn-success me-2 fw-bold" onClick={() => handleSaveEdit(app.id)}>Save Changes</button>
                    <button className="btn btn-sm btn-secondary fw-bold" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <p className="mb-1"><strong>Date:</strong> {app.date}</p>
                    <p className="mb-3 text-white-50"><strong>Complaint:</strong> {app.complaint}</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-warning fw-bold px-3 py-1 rounded-pill" onClick={() => handleStartEdit(app)}>Reschedule</button>
                      <button className="btn btn-sm btn-danger fw-bold px-3 py-1 rounded-pill" onClick={() => handleCancel(app.id)}>Cancel Appointment</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <Link to="/" className="btn btn-dark rounded-pill">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div style={{ backgroundColor: '#FFFCF3', minHeight: '100vh', padding: '100px 20px 40px 20px' }}>
      <div className="container">
        <h2 className="fw-bold mb-4" style={{ color: '#044060', fontFamily: 'Playfair Display, serif' }}>Traveler Profile</h2>
        {user ? (
          <div className="card p-4 border-0 shadow-sm" style={{ maxWidth: '500px', backgroundColor: '#044060', color: '#FFFCF3' }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p className="text-muted">No user logged in.</p>
        )}
        <div className="mt-4">
          <Link to="/" className="btn btn-dark rounded-pill">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

const STORY_MODEL_DATA = {
  philosophy: {
    title: "Our Philosophy", 
    subtitle: "ROOTED IN TRADITION, ADVANCING THROUGH SCIENCE", 
    content: (
      <>
        <p>
          Founded in 1000B.C. by The Great Lord Rukkhadevata and the pioneering adeptus of Liyue, <strong>Liyue Medical Center</strong> was established upon a vision to unite the wisdom of ancient healing with the advancements of modern medicine. 
        </p>
        <div className="text-center my-3">
          <img 
          src="https://i.pinimg.com/1200x/46/03/5a/46035a8a579d9c24f62a2b474ae2a2c5.jpg"
          alt="The Great Lord Rukkhadevata"
          className="story-model-img"
          />
        </div>
        <p>
          Our approach extends beyond treating illness. We strive to understand each patient's needs, uphold the highest standards of medical practice, and provide personalized care that respects both the individual and the complexity of human health. 
        </p>
        <p>
          In partnership with <strong>Bubu Pharmacy</strong> and <strong>The Liyue Institute of Health and Medicine</strong>, we strive to bridge the gap between traditional medicinal expertise and modern clinical research. 
        </p>
        <p>
          We believe that the future of medicine lies not in choosing between the wisdom of the past and the possibilities of the future, but in bringing the two together responsibly. 
        </p>
      </>
    )
  },
  mission: {
    title: "Our Mission", 
    subtitle: "SANCTUARY OF HOPE ACROSS ALL SEVEN NATIONS", 
    content: (
      <>
        <p>
          To bridge the wisdom of traditional healing with the advancements of modern medical science, providing comprehensive, patient-centered healthcare rooted in knowledge, innovation, and compassion.
        </p>
        <img 
          src="https://i.pinimg.com/736x/2e/8b/48/2e8b487f8f2a1813a11a9d0785d50f2f.jpg"
          alt="The Giver"
          className="story-model-img"
        />
        <p>
          <strong>Liyue Medical Center</strong> is committed to preserving valuable medicinal traditions, advancing evidence-based medical practices, and continuously improving the quality and accessibility of healthcare. Through research, collaboration, and a dedication to clinical excellence, we strive to deliver effective, ethical, and personalized care to every patient we serve.
        </p>
        <p>
          Our mission is to honor the knowledge of the past while embracing the possibilities of the future, ensuring that tradition and innovation work hand in hand toward a healthier tomorrow.
        </p>
      </>
    )
  }
};

function Navbar({ user, handleLogout }) {
  const navigate = useNavigate(); 
  
  const handleScheduledClick = (e) => {
    e.preventDefault(); 

    const currentUser = user || JSON.parse(localStorage.getItem('user')); 
    if (!currentUser) {
      alert("Please log in or register first to check your scheduled appointments!"); 
      navigate('/login');  
      return; 
    }

    const myAppointments = JSON.parse(localStorage.getItem('appointments')) || []; 
    if (myAppointments.length === 0) {
      alert("You have no scheduled appointments");
      return; 
    }

    navigate('/schedule-appointments');
  };

  return (
    <nav className="editorial-nav fixed-top w-100"> 
      <div className="container-fluid px-2 px-md-4 d-flex justify-content-between align-items-center"> 
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="d-flex align-items-center me-2">
            <img 
              src="https://i.pinimg.com/736x/ae/c7/bd/aec7bdf43558a8cfea4f5541051b8be8.jpg"
              alt="Liyue Medical Logo"
              className="nav-logo-img"
            />
          </Link>
        </div>

        <div className="d-flex align-items-center gap-4"> 
          <a className="editorial-link" href="#our-story">Our Story</a>
          <a className="editorial-link" href="#services">Services</a>
        </div>

        <div className="d-flex align-items-center gap-4 ms-auto"> 
          <a className="editorial-link d-none d-md-inline" href="#appointment">Book Appointment</a>
          
          {user ? (
            <span className="editorial-link text-warning">
              Traveler: <strong>{user.name}</strong>
            </span>
          ) : (
            <>
              <Link className="editorial-link" to="/login">Log In</Link>
              <Link className="editorial-link" to="/register">Register Now</Link>
            </>
          )}

          <div className="dropdown ms-1">
            <button 
              className="btn text-white opacity-75 fs-5 p-0 border-0 bg-transparent shadow-none"
              type="button"
              id="menuDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: 'pointer', lineHeight: 1 }}
            >
              ≡
            </button>
            <ul className="dropdown-menu dropdown-menu-end genshin-dropdown-menu" aria-labelledby="menuDropdown">
              <li>
                <a
                  className="dropdown-item genshin-dropdown-item"
                  href="#"
                  onClick={handleScheduledClick}
                >
                  My Scheduled Appointments
                </a>
              </li> 
              <li> 
                <Link className="dropdown-item genshin-dropdown-item" to="/profile">
                  Profile 
                </Link>
              </li>

              {user && (
                <>
                  <li><hr className="dropdown-divider genshin-dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item genshin-dropdown-item text-danger border-0 bg-transparent" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}

              <li><hr className="dropdown-divider genshin-dropdown-divider" /></li>
              <li>
                <Link className="dropdown-item genshin-dropdown-item text-warning" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

function OurStorySection() {
  const [activeModelContent, setActiveModelContent] = useState(null); 

  return (
    <section id="our-story" className="story-section">
      <div className="container-fluid px-4 px-md-5">
        <div className="row align-items-center justify-content-between g-4">
          <div className="col-lg-4 text-start">
            <div className="story-subtitle">LIYUE MEDICAL CENTER</div>
            <h2 className="fw-bold" style={{ color: '#044060', fontFamily: 'Playfair Display, serif' }}>
              About Us
            </h2>
            <p className="story-desc">
              Established with a commitment to excellence in healthcare, Liyue Medical Center is a healthcare institution dedicated to delivering comprehensive, patient-centered medical services. 
            </p>
            <p className="story-desc opacity-75 small mb-4">
              In partnership with Bubu Pharmacy and The Liyue Institute of Health & Medicine. 
            </p>
            <div className="stats-horizontal-container">
              <div className="stat-item">
                <div className="stat-num">50,000+</div>
                <div className="stat-label">Patients Served</div>
              </div>

              <div className="stat-item">
                <div className="stat-num">98%</div>
                <div className="stat-label">Patient Satisfaction</div>
              </div>

              <div className="stat-item">
                <div className="stat-num">24/7</div>
                <div className="stat-label">Medical Care</div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 text-center my-4 my-lg-0">
            <div className="center-logo-wrapper">
              <img 
                src="/new-medical-logo-liyue.png"
                alt="Liyue Medical Emblem"
                className="center-logo-img"
              />
            </div>
          </div>

          <div className="col-lg-4 text-start">
            <div className="story-glass-card" onClick={() => setActiveModelContent(STORY_MODEL_DATA.philosophy)}>
              <h3 className="card-story-title">Our Philosophy</h3>
              <p className="card-story-text">Blending healing traditions of Liyue with modern medicine.</p>
              <div className="card-hint-click">
                <span>Read Full Philosophy</span> <span>➔</span>
              </div>
            </div>

            <div className="story-glass-card" onClick={() => setActiveModelContent(STORY_MODEL_DATA.mission)}>
              <h3 className="card-story-title">Our Mission</h3>
              <p className="card-story-text">Sanctuary of hope providing care across all Seven Nations.</p>
              <div className="card-hint-click">
                <span>Read Full Mission</span> <span>➔</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeModelContent && (
        <div className="story-model-overlay" onClick={() => setActiveModelContent(null)}>
          <div className="story-model-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-story-model-btn" onClick={() => setActiveModelContent(null)}>
              ✕
            </button>
            <span className="story-model-badge">✦ {activeModelContent.subtitle} ✦</span>
            <h2 className="story-model-title">{activeModelContent.title}</h2>
            <div className="story-model-body mt-4">
              {activeModelContent.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ServicesSection() {
  const [activeModalService, setActiveModalService] = useState(null);

  const serviceDetails = {
    specialization: {
      title: "Specialization & Subspecialization",
      tag: "CLINICAL EXCELLENCE",
      description: "Liyue Medical Center houses over 15+ specialized medical departments, ranging from Cardiology, Traditional Herbal Medicine, Cryo-Therapy, to Advanced Neurological Surgery. Each department is managed by certified practitioners combining Teyvat traditions with modern clinical protocols.",
      features: [
        "15+ Comprehensive Medical Specializations",
        "Board-certified consultants and senior physicians",
        "Integrated cross-departmental patient care",
        "Advanced diagnostic and laboratory support"
      ]
    },
    emergency: {
      title: "24/7 Emergency Services",
      tag: "CRITICAL CARE",
      description: "Our Emergency Unit operates round-the-clock with dedicated trauma surgeons, critical care nurses, and rapid-response ambulance fleets ready to handle acute medical emergencies at any moment.",
      features: [
        "24-Hour Trauma & Critical Care Unit",
        "Rapid response medical transport teams",
        "Fully equipped ICU and isolation wards",
        "Immediate priority triage system"
      ]
    },
    homecare: {
      title: "50+ Homecare & Nursing Services",
      tag: "PATIENT-CENTRIC CARE",
      description: "Professional medical care delivered directly to your residence. From post-surgical nursing, chronic disease monitoring, elderly care, to specialized herbal therapy sessions administered by certified practitioners.",
      features: [
        "Over 50+ specialized home nursing programs",
        "Certified professional caregivers and therapists",
        "Portable diagnostic and monitoring equipment",
        "Customized patient recovery schedules"
      ]
    }
  };

  return (
    <>
      <section id="services" className="py-5" style={{ backgroundColor: '#FFFCF3' }}>
        <div className="container px-4 px-md-5 py-4">
          <div className="text-center mb-5">
            <span className="text-uppercase fw-bold small text-danger" style={{ letterSpacing: '2px' }}>
              OUR MEDICAL SERVICES 
            </span>
            <h2 className="fw-bold mt-1" style={{ fontFamily: 'Playfair Display, serif', color: '#044060', fontSize: '2.5rem' }}>
              Excellence in Healthcare & Clinical Practice
            </h2>
            <p className="text-muted small">Click any service card below to view detailed information.</p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div 
                onClick={() => setActiveModalService(serviceDetails.specialization)}
                className="p-4 rounded-4 shadow-sm text-white h-100 d-flex flex-column justify-content-between cursor-pointer"
                style={{ backgroundColor: '#044060', minHeight: '380px', cursor: 'pointer', transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <div className="mb-4 bg-white bg-opacity-10 rounded-circle d-inline-flex p-3">
                    <span className="fs-3">🛡️</span>
                  </div>
                  <h3 className="fw-bold" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>
                    15+
                  </h3>
                  <p className="fw-semibold mb-0" style={{ fontSize: '1.1rem' }}>
                    Specialization & Subspecialization
                  </p>
                </div>
                <div className="d-flex justify-content-end align-items-center mt-4">
                  <span className="rounded-circle bg-white text-dark p-2 d-flex align-items-center justify-content-center shadow" style={{ width: '38px', height: '38px' }}>
                    ➔
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div 
                onClick={() => setActiveModalService(serviceDetails.emergency)}
                className="p-4 rounded-4 shadow-sm text-white h-100 d-flex flex-column justify-content-between cursor-pointer"
                style={{ backgroundColor: '#044060', minHeight: '380px', cursor: 'pointer', transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <div className="mb-4 bg-white bg-opacity-10 rounded-circle d-inline-flex p-3">
                    <span className="fs-3">⏳</span>
                  </div>
                  <h3 className="fw-bold" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>
                    24/7
                  </h3>
                  <p className="fw-semibold mb-0" style={{ fontSize: '1.1rem' }}>
                    Emergency Services
                  </p>
                </div>
                <div className="d-flex justify-content-end align-items-center mt-4">
                  <span className="rounded-circle bg-white text-dark p-2 d-flex align-items-center justify-content-center shadow" style={{ width: '38px', height: '38px' }}>
                    ➔
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div 
                onClick={() => setActiveModalService(serviceDetails.homecare)}
                className="p-4 rounded-4 shadow-sm text-white h-100 d-flex flex-column justify-content-between cursor-pointer"
                style={{ backgroundColor: '#044060', minHeight: '380px', cursor: 'pointer', transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <div className="mb-4 bg-white bg-opacity-10 rounded-circle d-inline-flex p-3">
                    <span className="fs-3">🏡</span>
                  </div>
                  <h3 className="fw-bold" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>
                    50+
                  </h3>
                  <p className="fw-semibold mb-0" style={{ fontSize: '1.1rem' }}>
                    Homecare Programs
                  </p>
                </div>
                <div className="d-flex justify-content-end align-items-center mt-4">
                  <span className="rounded-circle bg-white text-dark p-2 d-flex align-items-center justify-content-center shadow" style={{ width: '38px', height: '38px' }}>
                    ➔
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeModalService && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(2, 27, 41, 0.75)', backdropFilter: 'blur(5px)' }}
          onClick={() => setActiveModalService(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content rounded-4 border-0 shadow-lg" style={{ backgroundColor: '#FFFCF3', overflow: 'hidden' }}>
              <div className="modal-header text-white px-4 py-4" style={{ backgroundColor: '#044060' }}>
                <div>
                  <span className="text-uppercase small fw-bold" style={{ color: '#BFD6E2', letterSpacing: '1.5px' }}>
                    ✦ {activeModalService.tag} ✦
                  </span>
                  <h3 className="modal-title fw-bold mt-1" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>
                    {activeModalService.title}
                  </h3>
                </div>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setActiveModalService(null)}
                ></button>
              </div>

              <div className="modal-body p-4 p-md-5">
                <p className="text-muted mb-4" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                  {activeModalService.description}
                </p>

                <h5 className="fw-bold mb-3" style={{ color: '#044060', fontFamily: 'Playfair Display, serif' }}>
                  Key Service Highlights:
                </h5>
                <ul className="list-unstyled mb-4">
                  {activeModalService.features.map((feature, idx) => (
                    <li key={idx} className="mb-2 d-flex align-items-center" style={{ fontSize: '0.95rem', color: '#2c3e50' }}>
                      <span className="me-2 text-danger fw-bold">✓</span> {feature}
                    </li>
                  ))}
                </ul>

                <div className="text-end mt-4">
                  <button 
                    type="button" 
                    className="btn px-4 py-2 rounded-pill fw-bold text-white shadow-sm"
                    style={{ backgroundColor: '#790707', border: 'none' }}
                    onClick={() => {
                      setActiveModalService(null);
                      document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book an Appointment Now ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function StoryDividerSection() {
  return (
    <section className="liyue-story-divider">
      <div className="container-fluid px-4 px-md-5 w-100">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-9 text-start">
            <div className="story-category-tag">
              #HealingThroughHarmony
            </div>

            <h2 className="story-main-title">
              The Journey Towards Better Vision and Lifelong Eye Health.
            </h2>

            <div className="story-doctor-box">
              <img 
                src="https://i.pinimg.com/736x/08/cc/cf/08cccf5e4da6c5c2d3080ec8014ad6ee.jpg" 
                alt="Doctor Profile" 
                className="story-doctor-avatar"
              />
              <div>
                <h6 className="story-doctor-name">Dr. Yae Miko, Consultant Ophthalmologist</h6>
                <p className="story-doctor-spec">Ophthalmology Specialist — Consultant in Eye Health & Vision Care</p>
              </div>
            </div>

            <p className="story-excerpt">
              This condition was once experienced by a patient who began noticing gradual changes in their vision, accompanied by persistent visual discomfort. Following a comprehensive ophthalmological examination at Liyue Medical Center, an underlying eye condition was identified and treated through a personalized care plan. With timely intervention and continued medical supervision, the patient experienced significant improvements in visual function and overall eye health.
            </p>

            <div className="story-actions">
              <a href="#read-story" className="story-link-item">
                Read Full Story ➔
              </a>
              <a href="#all-stories" className="story-link-item" style={{ opacity: 0.85, fontSize: '0.85rem' }}>
                Explore All Patient Stories ➔
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppointmentSection() {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [complaint, setComplaint] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(err => {
        console.error("Gagal memuat data dokter:", err);
      });
  }, []);

  const specializations = [...new Set(doctors.map(doc => doc.specialty).filter(Boolean))];

  const filteredDoctors = selectedSpecialty 
    ? doctors.filter(doc => doc.specialty === selectedSpecialty)
    : doctors;

  const handleBookAppointment = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
      alert("Please log in or register first to book an appointment!");
      navigate('/login');
      return;
    }

    if (!selectedDoctor || !patientName || !appointmentDate) {
      alert("Please fill in the patient's name, select a doctor, and choose an appointment date!");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patientName,
      doctor: selectedDoctor,
      date: appointmentDate,
      complaint: complaint || 'General Consultation'
    };

    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));

    alert(`Success! Your appointment with ${selectedDoctor} on ${appointmentDate} has been scheduled.`);
    
    setPatientName('');
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setAppointmentDate('');
    setComplaint('');
  };

  return (
    <section id="appointment">
      <div className="container-fluid px-4 px-md-5">
        <div className="row align-items-center justify-content-between g-5">
          <div className="col-lg-5 text-start pe-lg-5">
            <div className="appointment-left-subtitle">✦ LIYUE MEDICAL BOOKING ✦</div>
            <h2 className="appointment-left-title">
              Book an Appointment with Our Specialists
            </h2>
            <p className="appointment-left-desc">
              Choose from over {doctors.length || '30+'}+ registered specialist doctors in our database. Filter by your preferred specialization and schedule your visit instantly.
            </p>
          </div>

          <div className="col-lg-7">
            <div className="appointment-card-box">
              <form onSubmit={handleBookAppointment}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="appointment-form-label">Patient Full Name</label>
                    <input 
                      type="text" 
                      className="form-control appointment-input-field"
                      placeholder="Enter your full name..."
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="appointment-form-label">Filter by Specialization</label>
                    <select 
                      className="form-select appointment-select-field"
                      value={selectedSpecialty}
                      onChange={(e) => {
                        setSelectedSpecialty(e.target.value);
                        setSelectedDoctor(''); 
                      }}
                    >
                      <option value="">-- All Specializations ({specializations.length}) --</option>
                      {specializations.map((spec, index) => (
                        <option key={index} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="appointment-form-label">Select Specialist Doctor</label>
                    <select 
                      className="form-select appointment-select-field"
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      required
                    >
                      <option value="" disabled>-- Select Doctor ({filteredDoctors.length} available) --</option>
                      {filteredDoctors.map(doc => (
                        <option key={doc._id} value={`${doc.name} (${doc.specialty})`}>
                          {doc.name} — {doc.specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="appointment-form-label">Appointment Date</label>
                    <input 
                      type="date" 
                      className="form-control appointment-input-field"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>

                  <div className="col-12">
                    <label className="appointment-form-label">Medical Complaint / Notes (Optional)</label>
                    <input 
                      type="text" 
                      className="form-control appointment-input-field"
                      placeholder="e.g., Routine check-up or specific symptoms"
                      value={complaint}
                      onChange={(e) => setComplaint(e.target.value)}
                    />
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button type="submit" className="appointment-submit-btn shadow">
                      Confirm & Schedule Appointment ➔
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="liyue-footer-section">
      <div className="footer-container">
        <div className="footer-header-row">
          <h3 className="footer-title">Our Affiliations</h3>
          <div className="footer-affiliates-group">
            <img 
              src="https://i.pinimg.com/736x/0e/2e/96/0e2e963ebdf46525f4c15ad83a67a58a.jpg" 
              alt="The Yae-Miko Foundation" 
              className="affiliate-logo-item" 
              title="Fontaine Medical Institute"
            />
            <img 
              src="https://i.pinimg.com/736x/15/8a/5a/158a5a4529bd43b457048734864214f6.jpg" 
              alt="Snezhayan Medical Society" 
              className="affiliate-logo-item" 
              title="Snezhayan Medical Society"
            />
            <img 
              src="https://i.pinimg.com/1200x/34/f7/00/34f700d8069a416f56cd7ed40cc35eb6.jpg" 
              alt="Bubu Pharmacy" 
              className="affiliate-logo-item" 
              title="Columbina Foundation"
            />
          </div>
        </div>

        <p className="footer-desc-text">
          Liyue Medical Center is Teyvat's premier private healthcare network providing comprehensive medical facilities, specialist clinics, and 24/7 emergency care across multiple regions. In partnership with esteemed institutions such as the Fontaine Medical Institute and Snezhayan Medical Society, Liyue Medical reaches every community with professional medical personnel ready to deliver world-class clinical excellence.
        </p>

        <a href="#about" className="footer-learn-more">
          Learn More ➔
        </a>

        <hr className="footer-bottom-divider" />
        <div className="footer-copyright">
          © 2026 Liyue Medical Center Tbk. All rights reserved. Designed with clinical precision and modern elegance.
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main>
      <div> 
        <section className="homepage-bg min-vh-100 d-flex flex-column justify-content-between pt-5 pb-4 px-3">
          <div className="pt-4"></div>

          <div className="homepage-content text-center my-auto px-2">
            <h1 className="hero-title mb-4">
              <span className="italic-accent">Liyue</span> Medical Center
            </h1>
            
            <div className="text-center mb-4 px-3">
              <h2 
                style={{ 
                  fontFamily: 'Playfair Display, serif', 
                  fontSize: '2.0rem', 
                  fontWeight: '400', 
                  color: '#f9f8f4', 
                  marginBottom: '12px'
                }}
              >
                A Sanctuary of Healing, Across All of Teyvat
              </h2>

              <p 
                className="text-white mx-auto" 
                style={{ 
                  maxWidth: '600px', 
                  fontFamily: 'Playfair Display, serif', 
                  fontSize: '1.0rem', 
                  fontWeight: '300', 
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}
              >
                A legacy of excellence. A commitment to life. United by the pursuit of healing, we stand ready to serve every traveler who crosses our threshold, wherever their journey may lead.
              </p>
            </div>

            <div>
              <div style={{ marginTop: '55px' }}></div>
              <a href="#appointment" className="btn-editorial-capsule">
                Book Appointment
              </a>
            </div>
          </div>

          <div className="homepage-content pb-2 text-center text-white-50" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}> 
            LIYUE INSTITUTE OF HEALTH AND MEDICINE
          </div>
        </section>
        <OurStorySection />
        <ServicesSection />
        <StoryDividerSection />
        <AppointmentSection />
        <FooterSection /> 
      </div>
    </main> 
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setCurrentUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/schedule-appointments" element={<ScheduledAppointmentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}