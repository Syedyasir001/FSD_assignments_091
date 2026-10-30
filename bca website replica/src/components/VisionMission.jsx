import React from 'react';

export default function VisionMission() {
  return (
    <section className="vision-mission py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">OUR VALUES</span>
          <h2 className="section-title">Vision &amp; Mission</h2>
        </div>

        <div className="row g-4">
          {/* Vision */}
          <div className="col-lg-6" data-aos="zoom-in">
            <div className="vision-card">
              <div className="vm-icon">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h3>Vision</h3>
              <p>
                To be a premier center of excellence in computer applications education, research, and innovation,
                nurturing globally competent technocrats and ethical leaders.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="150">
            <div className="vision-card">
              <div className="vm-icon">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3>Mission</h3>
              <ul>
                <li>Provide state-of-the-art computing facilities and industry-aligned curriculum.</li>
                <li>Foster cutting-edge research, critical thinking, and innovative problem solving.</li>
                <li>Bridge academia and industry through internships, hackathons, and global partnerships.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
