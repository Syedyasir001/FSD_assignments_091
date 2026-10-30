import React, { useState, useMemo } from 'react';
import { facultyData } from '../data/facultyData';
import FacultyModal from './FacultyModal';

export default function Faculty() {
  const [searchTerm, setSearchTerm] = useState('');
  const [designation, setDesignation] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const filteredFaculty = useMemo(() => {
    const keyword = searchTerm.toLowerCase().trim();
    return facultyData.filter((f) => {
      const matchName = f.name.toLowerCase().includes(keyword) || f.research.toLowerCase().includes(keyword);
      const matchDesignation = designation === 'all' || f.designation.toLowerCase() === designation.toLowerCase();
      return matchName && matchDesignation;
    });
  }, [searchTerm, designation]);

  return (
    <section id="faculty" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">OUR FACULTY</span>
          <h2 className="section-title">Faculty Directory</h2>
          <p className="section-description">
            Meet our experienced academicians, researchers, and industry experts dedicated to academic excellence.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-8 mb-3">
            <input
              type="text"
              id="facultySearch"
              className="form-control form-control-lg shadow-sm"
              placeholder="Search faculty by name or research area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-lg-4">
            <select
              id="designationFilter"
              className="form-select form-select-lg shadow-sm"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="all">All Designations</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Assistent Professor">Assistant Professor (All)</option>
            </select>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="row g-4" id="facultyContainer">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((f, idx) => (
              <div className="col-lg-4 col-md-6" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="faculty-card h-100">
                  <img src={f.image} className="faculty-image" alt={f.name} loading="lazy" />
                  <div className="faculty-body">
                    <h4>{f.name}</h4>
                    <span className="designation">{f.designation}</span>
                    <p>
                      <i className="fa-solid fa-graduation-cap me-2 text-warning"></i>
                      {f.qualification}
                    </p>
                    <p>
                      <i className="fa-solid fa-flask me-2 text-warning"></i>
                      {f.research}
                    </p>
                    <button className="btn btn-warning mt-3" onClick={() => setSelectedFaculty(f)}>
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h5 className="text-muted">No faculty members found matching your search.</h5>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <FacultyModal faculty={selectedFaculty} onClose={() => setSelectedFaculty(null)} />
    </section>
  );
}
