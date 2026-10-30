import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="contact-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">GET IN TOUCH</span>
          <h2 className="section-title">Contact Department</h2>
        </div>

        <div className="row g-5">
          {/* Contact Form */}
          <div className="col-lg-6" data-aos="fade-right">
            {submitted ? (
              <div className="alert alert-success p-4 rounded-4 shadow-sm text-center">
                <i className="fa-solid fa-circle-check fs-1 text-success mb-3"></i>
                <h4>Thank you!</h4>
                <p className="mb-0">Your message has been received. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />

                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>

                <button type="submit" className="btn btn-warning ripple">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="col-lg-6" data-aos="fade-left">
            <div className="contact-info mb-4">
              <h4>Department Office</h4>
              <p>
                <i className="fa-solid fa-location-dot me-3 text-warning"></i>
                RV University, Mysuru Road, Bengaluru - 560059, Karnataka, India
              </p>
              <p>
                <i className="fa-solid fa-envelope me-3 text-warning"></i>
                bca@rvu.edu.in
              </p>
              <p>
                <i className="fa-solid fa-phone me-3 text-warning"></i>
                +91 98765 43210 / 080 6717 8000
              </p>
              <p>
                <i className="fa-solid fa-clock me-3 text-warning"></i>
                Monday - Friday: 9:00 AM - 5:00 PM
              </p>
            </div>

            <div className="map-placeholder text-center p-4">
              <i className="fa-solid fa-map-location-dot fs-1 text-warning mb-2"></i>
              <h5>RV University Campus</h5>
              <p className="small text-muted mb-0">Mysuru Road, RV Vidyanikethan Post, Bengaluru</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
