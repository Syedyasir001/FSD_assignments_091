import React from 'react';

export default function Research() {
  const cards = [
    {
      title: 'Publications',
      count: '350+',
      icon: 'fa-solid fa-book-open',
      desc: 'Research papers published in reputed national and international journals and conferences.',
      btn: 'View Publications',
      delay: '0'
    },
    {
      title: 'Projects',
      count: '75+',
      icon: 'fa-solid fa-lightbulb',
      desc: 'Faculty and student projects solving real-world industrial and societal problems.',
      btn: 'Explore Projects',
      delay: '100'
    },
    {
      title: 'Patents',
      count: '25+',
      icon: 'fa-solid fa-award',
      desc: 'Innovative solutions protected through intellectual property development.',
      btn: 'View Patents',
      delay: '200'
    },
    {
      title: 'Collaborations',
      count: '40+',
      icon: 'fa-solid fa-handshake',
      desc: 'Academic and industry partnerships promoting innovation and knowledge sharing.',
      btn: 'Partners',
      delay: '300'
    }
  ];

  return (
    <section id="research" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">RESEARCH &amp; DEVELOPMENT</span>
          <h2 className="section-title">Research &amp; Innovation</h2>
          <p>Creating solutions through interdisciplinary research, innovation, entrepreneurship and collaboration.</p>
        </div>

        <div className="row g-4">
          {cards.map((c, idx) => (
            <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={c.delay} key={idx}>
              <div className="research-card h-100">
                <div className="research-icon">
                  <i className={c.icon}></i>
                </div>
                <h4>{c.title}</h4>
                <h2>{c.count}</h2>
                <p>{c.desc}</p>
                <a href="#contact" className="btn btn-outline-warning">
                  {c.btn}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
