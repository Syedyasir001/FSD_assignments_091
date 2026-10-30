import React from 'react';

export default function Labs() {
  const labs = [
    {
      title: 'Programming Lab',
      image: '/assets/labs/programming-lab.jpg',
      icon: 'fa-solid fa-code',
      desc: 'Equipped with high-performance systems supporting C, C++, Java, Python, Web Development and Software Engineering.',
      delay: '0'
    },
    {
      title: 'Artificial Intelligence Lab',
      image: '/assets/labs/ai-lab.jpg',
      icon: 'fa-solid fa-brain',
      desc: 'Research facility for Machine Learning, Deep Learning, Computer Vision, and Natural Language Processing.',
      delay: '100'
    },
    {
      title: 'Cloud Computing Lab',
      image: '/assets/labs/cloud-lab.jpg',
      icon: 'fa-solid fa-cloud',
      desc: 'Hands-on learning environment for cloud architecture, virtualization, DevOps and distributed systems.',
      delay: '200'
    },
    {
      title: 'Networking Lab',
      image: '/assets/labs/networking-lab.jpg',
      icon: 'fa-solid fa-network-wired',
      desc: 'Cisco-enabled networking facility for network administration, routing, switching and security.',
      delay: '0'
    },
    {
      title: 'Cyber Security Lab',
      image: '/assets/labs/cyber-lab.jpg',
      icon: 'fa-solid fa-user-secret',
      desc: 'Security testing environment for ethical hacking, vulnerability assessment, and digital forensics.',
      delay: '100'
    },
    {
      title: 'Database Laboratory',
      image: '/assets/labs/database-lab.jpg',
      icon: 'fa-solid fa-database',
      desc: 'Advanced database systems laboratory supporting SQL, NoSQL, data management and analytics.',
      delay: '200'
    }
  ];

  return (
    <section id="labs" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">INFRASTRUCTURE</span>
          <h2 className="section-title">Advanced Laboratories</h2>
          <p className="section-description">
            Our department provides modern computing facilities equipped with latest hardware and software technologies
            to support academic learning and research.
          </p>
        </div>

        <div className="row g-4">
          {labs.map((lab, idx) => (
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={lab.delay} key={idx}>
              <div className="lab-card h-100">
                <div className="lab-image">
                  <img src={lab.image} alt={lab.title} loading="lazy" />
                </div>
                <div className="lab-content">
                  <div className="lab-icon">
                    <i className={lab.icon}></i>
                  </div>
                  <h4>{lab.title}</h4>
                  <p>{lab.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
