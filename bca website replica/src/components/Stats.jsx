import React, { useState, useEffect, useRef } from 'react';

function CounterItem({ target, label, icon }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1500;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div className="col-lg-2 col-md-4 col-6" ref={ref}>
      <div className="stat-card">
        <i className={icon}></i>
        <h2 className="counter">{started ? `${count}+` : '0'}</h2>
        <p>{label}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  const stats = [
    { target: 1800, label: 'Students', icon: 'fa-solid fa-user-graduate' },
    { target: 48, label: 'Faculty', icon: 'fa-solid fa-chalkboard-user' },
    { target: 12, label: 'Laboratories', icon: 'fa-solid fa-laptop-code' },
    { target: 97, label: 'Placement %', icon: 'fa-solid fa-briefcase' },
    { target: 210, label: 'Recruiters', icon: 'fa-solid fa-building' },
    { target: 8500, label: 'Alumni', icon: 'fa-solid fa-award' },
  ];

  return (
    <section className="stats py-5">
      <div className="container">
        <div className="row text-center g-4">
          {stats.map((s, idx) => (
            <CounterItem key={idx} target={s.target} label={s.label} icon={s.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
