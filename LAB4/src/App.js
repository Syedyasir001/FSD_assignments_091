import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    qualification: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.position ||
      !formData.qualification
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="navbar">
        <div className="logo-section">
          <div className="logo-icon">
            <span>⬡</span>
          </div>

          <h2>Nova<span>Works</span></h2>
        </div>

        <nav>
          <a href="#careers">Careers</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>

          <button className="nav-button">
            Join Our Team
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="hero">
        <div className="background-circle circle-one"></div>
        <div className="background-circle circle-two"></div>

        <div className="content-wrapper">

          {/* Left Section */}
          <section className="intro-section">

            <div className="hiring-badge">
              <span className="pulse"></span>
              We're Hiring
            </div>

            <h1>
              Build your
              <br />
              <span>future with us.</span>
            </h1>

            <p className="intro-text">
              Join a team of ambitious thinkers, talented engineers,
              and creative problem solvers building technology that
              makes a difference.
            </p>

            <div className="stats">
              <div>
                <strong>50+</strong>
                <span>Team Members</span>
              </div>

              <div>
                <strong>12+</strong>
                <span>Countries</span>
              </div>

              <div>
                <strong>20+</strong>
                <span>Projects</span>
              </div>
            </div>

            <div className="benefits">

              <div className="benefit">
                <div className="benefit-icon blue">
                  🚀
                </div>

                <div>
                  <h3>Grow Your Career</h3>
                  <p>
                    Challenging projects and continuous learning
                    opportunities.
                  </p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon purple">
                  👥
                </div>

                <div>
                  <h3>Collaborative Culture</h3>
                  <p>
                    Work alongside passionate and supportive
                    teammates.
                  </p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon green">
                  ✦
                </div>

                <div>
                  <h3>Make an Impact</h3>
                  <p>
                    Create products that solve meaningful problems.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Form Section */}
          <section className="form-card">

            <div className="form-header">

              <div className="form-icon">
                📝
              </div>

              <div>
                <div className="form-label">
                  CAREER APPLICATION
                </div>

                <h2>Join our team</h2>

                <p>
                  Tell us a little about yourself and your
                  experience.
                </p>
              </div>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="input-group">
                <label>Full Name</label>

                <div className="input-wrapper">
                  <span>👤</span>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="input-group">
                <label>Email Address</label>

                <div className="input-wrapper">
                  <span>✉</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="input-group">
                <label>Phone Number</label>

                <div className="input-wrapper">
                  <span>☎</span>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Position + Qualification */}
              <div className="two-column">

                <div className="input-group">
                  <label>Position</label>

                  <div className="input-wrapper">
                    <span>💼</span>

                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select position
                      </option>

                      <option value="full-stack">
                        Full Stack Developer
                      </option>

                      <option value="frontend">
                        Frontend Developer
                      </option>

                      <option value="backend">
                        Backend Developer
                      </option>

                      <option value="ui-ux">
                        UI/UX Designer
                      </option>

                      <option value="data-scientist">
                        Data Scientist
                      </option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Qualification</label>

                  <div className="input-wrapper">
                    <span>🎓</span>

                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select qualification
                      </option>

                      <option value="graduate">
                        Graduate
                      </option>

                      <option value="post-graduate">
                        Post Graduate
                      </option>

                      <option value="diploma">
                        Diploma
                      </option>

                      <option value="phd">
                        PhD
                      </option>
                    </select>
                  </div>
                </div>

              </div>

              <button
                type="submit"
                className="submit-button"
              >
                <span>Submit Application</span>
                <span className="arrow">→</span>
              </button>

            </form>

            {/* Success Message */}
            {submitted && (
              <div className="success-message">
                <div className="success-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Application submitted!
                  </strong>

                  <p>
                    Thanks {formData.fullName}. We'll get
                    back to you soon.
                  </p>
                </div>
              </div>
            )}

            <div className="privacy-note">
              🔒 Your information is secure and will only
              be used for recruitment purposes.
            </div>

          </section>

        </div>
      </main>

      {/* Footer */}
      <footer>
        <p>
          © 2026 NovaWorks. All rights reserved.
        </p>

        <div>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </footer>
    </div>
  );
}

export default App;