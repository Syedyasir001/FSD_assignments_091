import React from 'react';

export default function FacultyModal({ faculty, onClose }) {
  if (!faculty) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1055 }}
      tabIndex="-1"
      onClick={onClose}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <div className="modal-header border-0 bg-warning text-dark py-3 px-4">
            <h5 className="modal-title fw-bold">Faculty Profile</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4" id="facultyModalBody">
            <div className="row align-items-center g-4">
              <div className="col-md-4 text-center">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="rounded-circle border border-3 border-warning shadow"
                  style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                />
              </div>

              <div className="col-md-8">
                <h3 className="fw-bold mb-1">{faculty.name}</h3>
                <h5 className="text-warning fw-semibold mb-3">{faculty.designation}</h5>
                <hr />

                <p className="mb-2">
                  <strong>Qualification:</strong> {faculty.qualification}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {faculty.email}
                </p>
                <p className="mb-2">
                  <strong>Cabin:</strong> {faculty.cabin}
                </p>
                <p className="mb-2">
                  <strong>Research Area:</strong> {faculty.research}
                </p>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0 p-3">
            <button type="button" className="btn btn-secondary px-4" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
