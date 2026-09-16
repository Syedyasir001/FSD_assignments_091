import "./App.css";

function App() {
  return (
    <div className="resume-page">
      <div className="resume-container">

        {/* ── HERO HEADER ── */}
        <header className="resume-hero">
          <img
            className="resume-avatar"
            src="https://ui-avatars.com/api/?name=Syed+Yasir&background=1e3a5f&color=fff&size=200"
            alt="Syed Yasir"
          />
          <div className="hero-info">
            <h1>Syed Yasir</h1>
            <p className="hero-title">Full Stack Developer &nbsp;·&nbsp; BCA (Hons) Candidate</p>
            <div className="hero-contacts">
              <a href="mailto:syedyasirbca24@rvu.edu.in" className="contact-chip">
                <span className="icon">✉</span> syedyasirbca24@rvu.edu.in
              </a>
              <a href="tel:9019796364" className="contact-chip">
                <span className="icon">📞</span> 9019796364
              </a>
              <a href="https://github.com/Syedyasir001" target="_blank" rel="noreferrer" className="contact-chip">
                <span className="icon">🐙</span> github.com/Syedyasir001
              </a>
            </div>
          </div>
        </header>

        <div className="resume-body">

          {/* ── CAREER OBJECTIVE ── */}
          <section>
            <h2 className="section-title">Career Objective</h2>
            <p className="objective-text">
              Passionate and driven Full Stack Developer with a strong foundation in both front-end
              and back-end technologies. Seeking opportunities to build scalable, user-centric web
              applications while continuously growing my skills in modern software development.
            </p>
          </section>

          {/* ── EDUCATION ── */}
          <section>
            <h2 className="section-title">Education</h2>
            <div className="edu-card">
              <span className="edu-icon">🎓</span>
              <div className="edu-info">
                <h3>Bachelor of Computer Applications (Hons)</h3>
                <p>RV University, Bengaluru</p>
              </div>
              <span className="edu-badge">2024 – 2028</span>
            </div>
          </section>

          {/* ── SKILLS ── */}
          <section>
            <h2 className="section-title">Skills</h2>

            <div className="skills-group">
              <p className="skills-label">Languages</p>
              <div className="skills-chips">
                {["Python", "Java", "JavaScript", "HTML", "CSS", "SQL"].map(s => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </div>
            </div>

            <div className="skills-group">
              <p className="skills-label">Frameworks &amp; Libraries</p>
              <div className="skills-chips">
                {["React", "Node.js", "Express.js", "Flask"].map(s => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </div>
            </div>

            <div className="skills-group">
              <p className="skills-label">Tools &amp; Platforms</p>
              <div className="skills-chips">
                {["Git", "GitHub", "Docker", "VS Code"].map(s => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </div>
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section>
            <h2 className="section-title">Projects</h2>

            <div className="project-card">
              <div className="project-header">
                <h3>RVU Library App</h3>
                <span className="project-tag">Web App</span>
              </div>
              <p className="project-desc">
                A library management system that tracks student attendance and monitors the number
                of books borrowed from the library. Built to streamline operations for university
                library staff.
              </p>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>Face Tracking Attendance App</h3>
                <span className="project-tag">ML / CV</span>
              </div>
              <p className="project-desc">
                An intelligent attendance tracking system that uses face recognition to
                automatically mark student attendance, eliminating manual roll calls and improving
                accuracy.
              </p>
            </div>
          </section>

          {/* ── LANGUAGES ── */}
          <section>
            <h2 className="section-title">Languages</h2>
            <div className="lang-grid">
              {[
                { name: "English", level: "Professional" },
                { name: "Urdu", level: "Native" },
                { name: "Hindi", level: "Fluent" },
              ].map(l => (
                <div key={l.name} className="lang-item">
                  <p className="lang-name">{l.name}</p>
                  <p className="lang-level">{l.level}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── INTERESTS ── */}
          <section>
            <h2 className="section-title">Interests</h2>
            <div className="interests-grid">
              {["Open Source", "Machine Learning", "UI/UX Design", "Cloud Computing", "Competitive Coding"].map(i => (
                <span key={i} className="interest-chip">{i}</span>
              ))}
            </div>
          </section>

          <div className="resume-footer">
            <p>Syed Yasir &nbsp;·&nbsp; syedyasirbca24@rvu.edu.in &nbsp;·&nbsp; RV University, Bengaluru</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
