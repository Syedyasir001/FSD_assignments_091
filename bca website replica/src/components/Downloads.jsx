import React from 'react';

export default function Downloads() {
  const downloads = [
    {
      title: 'Syllabus',
      icon: 'fa-solid fa-book',
      desc: 'Latest curriculum and course structure.'
    },
    {
      title: 'Academic Calendar',
      icon: 'fa-solid fa-calendar',
      desc: 'Semester schedules and important dates.'
    },
    {
      title: 'Time Table',
      icon: 'fa-solid fa-clock',
      desc: 'Class schedules and laboratory timings.'
    },
    {
      title: 'Forms & Notices',
      icon: 'fa-solid fa-file-lines',
      desc: 'Department forms and announcements.'
    }
  ];

  return (
    <section id="downloads" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">RESOURCES</span>
          <h2 className="section-title">Downloads</h2>
        </div>

        <div className="row g-4">
          {downloads.map((item, idx) => (
            <div className="col-lg-3 col-md-6" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="download-card text-center h-100">
                <i className={item.icon}></i>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <a href="#contact" className="btn btn-warning">
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
