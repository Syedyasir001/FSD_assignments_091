import React from 'react';

export default function Placements() {
  const stats = [
    { title: '₹18 LPA', label: 'Highest Package', icon: 'fa-solid fa-money-bill-trend-up' },
    { title: '₹6.5 LPA', label: 'Average Package', icon: 'fa-solid fa-chart-line' },
    { title: '97%', label: 'Placement Rate', icon: 'fa-solid fa-user-check' },
    { title: '210+', label: 'Recruiting Partners', icon: 'fa-solid fa-building' }
  ];

  const internships = [
    { count: '1200+', label: 'Students Completed Internships', icon: 'fa-solid fa-graduation-cap' },
    { count: '150+', label: 'Industry Training Programs', icon: 'fa-solid fa-laptop' },
    { count: '2500+', label: 'Professional Certifications', icon: 'fa-solid fa-certificate' }
  ];

  return (
    <section id="placements" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">CAREER OPPORTUNITIES</span>
          <h2 className="section-title">Placement Excellence</h2>
          <p>Our dedicated placement cell connects students with leading technology companies and global organizations.</p>
        </div>

        <div className="row g-4 text-center">
          {stats.map((s, idx) => (
            <div className="col-lg-3 col-md-6" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="placement-stat h-100">
                <i className={s.icon}></i>
                <h2>{s.title}</h2>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Internships & Training */}
        <div className="row mt-5 g-4">
          {internships.map((item, idx) => (
            <div className="col-lg-4" key={idx} data-aos="fade-up" data-aos-delay={idx * 150}>
              <div className="internship-card text-center h-100">
                <i className={item.icon}></i>
                <h3>{item.count}</h3>
                <p>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
