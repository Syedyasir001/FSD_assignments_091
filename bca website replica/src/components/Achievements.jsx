import React from 'react';

export default function Achievements() {
  const achievements = [
    {
      title: 'National Hackathon Winners',
      icon: 'fa-solid fa-trophy',
      desc: 'Students secured top positions in national-level coding competitions and innovation challenges.'
    },
    {
      title: 'University Rank Holders',
      icon: 'fa-solid fa-medal',
      desc: 'Consistent academic excellence with multiple university toppers every year.'
    },
    {
      title: 'Startup Innovators',
      icon: 'fa-solid fa-rocket',
      desc: 'Students developing entrepreneurial solutions through innovation cells.'
    }
  ];

  return (
    <section className="py-5" id="achievements">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">STUDENT SUCCESS</span>
          <h2 className="section-title">Student Achievements</h2>
        </div>

        <div className="row g-4">
          {achievements.map((item, idx) => (
            <div className="col-lg-4 col-md-6" key={idx} data-aos="fade-up" data-aos-delay={idx * 150}>
              <div className="achievement-card h-100">
                <i className={item.icon}></i>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
