import React from 'react';

export default function Programs() {
  const programs = [
    {
      title: 'BCA (General)',
      icon: 'fa-solid fa-laptop-code',
      desc: 'Strong foundation in programming, databases, networking, software engineering, and web technologies.',
      delay: '0'
    },
    {
      title: 'BCA (AI & ML)',
      icon: 'fa-solid fa-robot',
      desc: 'Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing, and Intelligent Systems.',
      delay: '100'
    },
    {
      title: 'BCA (Data Science)',
      icon: 'fa-solid fa-chart-line',
      desc: 'Data Analytics, Big Data, Visualization, Predictive Analytics, Statistical Modelling, and Business Intelligence.',
      delay: '200'
    },
    {
      title: 'BCA (Cyber Security)',
      icon: 'fa-solid fa-shield-halved',
      desc: 'Ethical Hacking, Digital Forensics, Network Security, Cryptography, and Secure Cloud Computing Infrastructure.',
      delay: '300'
    }
  ];

  return (
    <section id="programs" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">ACADEMICS</span>
          <h2 className="section-title">Programs Offered</h2>
          <p>
            Industry-oriented undergraduate programs designed to prepare students for emerging technologies.
          </p>
        </div>

        <div className="row g-4">
          {programs.map((prog, idx) => (
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={prog.delay} key={idx}>
              <div className="program-card h-100">
                <i className={prog.icon}></i>
                <h4>{prog.title}</h4>
                <p>{prog.desc}</p>
                <a href="#contact" className="btn btn-outline-warning">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
