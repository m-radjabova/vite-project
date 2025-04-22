import { FaUser, FaEnvelope, FaUserShield, FaEdit, FaLock } from 'react-icons/fa';
import useContextPro from '../../hooks/useContextPro';
import ProfileForm from './ProfileForm';
import { useState } from 'react';

function Profile() {
  const { state: { user } } = useContextPro();
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className="container py-5" style={{ maxWidth: 880 }}>
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div
          className="bg-gradient text-white text-center py-5"
          style={{
            background: 'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)',
          }}
        >
          <div className="d-flex justify-content-center mb-4">
            <div
              className="rounded-circle bg-white text-primary shadow d-flex justify-content-center align-items-center"
              style={{
                width: 130,
                height: 130,
                fontSize: 48,
                border: '6px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {user?.name ? user.name.charAt(0) : <FaUser />}
            </div>
          </div>
          <h2 className="fw-bold mb-1">{user?.name || 'No name'}</h2>
          <p className="opacity-75 mb-0">{user?.email || 'No email'}</p>
        </div>
        <div className="card-body px-4 py-5">
          <div className="mb-5">
            <h5 className="mb-3 text-primary fw-bold d-flex align-items-center">
              <FaUser className="me-2" />
              Personal Information
            </h5>
            <hr />
            <div className="row gy-4">
              <div className="col-md-6 d-flex">
                <FaUser className="me-3 mt-1 text-secondary" />
                <div>
                  <div className="text-muted small">Full Name</div>
                  <div className="fw-semibold">{user?.name || 'Not specified'}</div>
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <FaEnvelope className="me-3 mt-1 text-secondary" />
                <div>
                  <div className="text-muted small">Email</div>
                  <div className="fw-semibold">{user?.email || 'Not specified'}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="mb-3 text-primary fw-bold d-flex align-items-center">
              <FaUserShield className="me-2" />
              Account Roles
            </h5>
            <hr />
            <p className="mb-2 text-muted">Your Permissions:</p>
            <div className="d-flex flex-wrap gap-2">
              {user?.roles?.length ? (
                user.roles.map(role => (
                  <span
                    key={role}
                    className="badge rounded-pill border text-primary bg-light fw-semibold px-3 py-2"
                    style={{ textTransform: 'capitalize' }}
                  >
                    <FaUserShield className="me-1" />
                    {role.replace('_', ' ')}
                  </span>
                ))
              ) : (
                <span className="text-muted fst-italic">No roles assigned</span>
              )}
            </div>
          </div>
        </div>
        <div className="bg-light p-4 d-flex justify-content-center gap-3">
          <button  
           onClick={handleOpen}
          className="btn btn-outline-primary btn-lg rounded-pill px-4 shadow-sm"
          >
            <FaEdit className="me-2" />
            Edit Profile
          </button>
          <button className="btn btn-outline-primary btn-lg rounded-pill px-4 shadow-sm">
            <FaLock className="me-2" />
            Change Password
          </button>
        </div>
      </div>
      <ProfileForm open={open} onClose={handleClose}/>
    </div>
  );
}

export default Profile;