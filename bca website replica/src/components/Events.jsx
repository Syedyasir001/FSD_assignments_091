import React from 'react';

export default function Events() {
  const events = [
    {
      date: '10 July 2026',
      title: 'National Level Coding Competition',
      desc: 'Department students participated in a national coding challenge and secured top rankings.'
    },
    {
      date: '25 June 2026',
      title: 'AI & Machine Learning Workshop',
      desc: 'Three-day hands-on workshop conducted with industry experts on modern neural networks.'
    },
    {
      date: '15 May 2026',
      title: 'Campus Placement Drive',
      desc: 'Leading IT companies conducted recruitment drives for final-year students with high conversion.'
    }
  ];

  return (
    <section id="events" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">LATEST UPDATES</span>
          <h2 className="section-title">News &amp; Events</h2>
        </div>

        <div className="timeline">
          {events.map((evt, idx) => (
            <div className="timeline-item" key={idx} data-aos="fade-up" data-aos-delay={idx * 150}>
              <div className="timeline-date">{evt.date}</div>
              <div className="timeline-content">
                <h4>{evt.title}</h4>
                <p>{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
