import React from 'react';

export default function Hod() {
  return (
    <section id="hod" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-4 text-center" data-aos="fade-right">
            <img
              src="/assets/faculty/hod.png"
              alt="Head of Department"
              className="img-fluid rounded-circle hod-image shadow-lg"
            />
          </div>

          <div className="col-lg-8" data-aos="fade-left">
            <span className="section-subtitle">HOD'S DESK</span>
            <h2 className="section-title">Message from the Head of Department</h2>

            <p className="lead">
              Welcome to the Department of Computer Applications. Our department is committed to nurturing
              future-ready professionals equipped with strong technical expertise, ethical values, innovation, and
              leadership qualities.
            </p>

            <p>
              Through industry-oriented curriculum, research-driven learning, cutting-edge laboratories, internships,
              innovation hubs, and collaboration with leading organizations, we prepare students to excel in the
              rapidly evolving world of computing.
            </p>

            <p>
              We believe education extends beyond classrooms. Our focus is on developing analytical thinking,
              creativity, teamwork, entrepreneurship, and lifelong learning among students.
            </p>

            <a href="#about" className="btn btn-warning ripple mt-3">
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
