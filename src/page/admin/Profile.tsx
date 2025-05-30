import { FaUser, FaEnvelope, FaUserShield, FaEdit, FaLock, FaCamera, FaStar, FaHamburger, FaPizzaSlice, FaIceCream } from 'react-icons/fa';
import useContextPro from '../../hooks/useContextPro';
import ProfileForm from './ProfileFom';
import { ChangeEvent, useState } from 'react';
import apiClient from '../../apiClient/ApiClient';
import { toast } from 'react-toastify';
import PasswordForm from './PasswordForm';

interface ProfileData {
  name: string;
  email: string;
}

function Profile() {
  const { state: { user }, dispatch } = useContextPro();
  const [open, setOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePasswordClose = () => setPasswordOpen(false);

  const handleEdit = async (data: ProfileData) => {
    try {
      const updateData = {
        name: data.name,
        email: data.email,
      };
  
      const response = await apiClient.patch(`/users/${user?.id}`, updateData);
      dispatch({ type: 'EDIT_USER', payload: response.data });
      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      toast.info('Profile picture selected (not uploaded to server)');
    }
  };
  
  return (
    <div className="container py-5" style={{ maxWidth: '880px' }}>
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div 
          className="text-white text-center py-5 position-relative"
          style={{
            backgroundImage: 'linear-gradient(rgba(253, 126, 20, 0.85), rgba(253, 126, 20, 0.85)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-white text-warning fw-semibold px-3 py-2">
              <FaStar className="me-1" />
              Food Lover
            </span>
          </div>
        
          <div className="d-flex justify-content-center mb-4 position-relative">
            <label 
              htmlFor="image-upload"
              className="rounded-circle bg-white text-warning shadow d-flex justify-content-center align-items-center position-relative hover-effect"
              style={{
                width: '140px',
                height: '140px',
                fontSize: '48px',
                border: '6px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {preview ? (
                <img 
                  src={preview} 
                  alt="Profile" 
                  className="w-100 h-100 object-cover"
                />
              ) : user?.username ? (
                <span style={{ 
                  background: 'linear-gradient(45deg, #fd7e14, #ffc107)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  fontSize: '60px'
                }}>
                  {user.username.charAt(0).toUpperCase()}
                </span>
              ) : (
                <FaUser className="text-warning" />
              )}
              <div className="position-absolute rounded-circle bg-white p-2 shadow-sm" style={{
                bottom: "5px", 
                right: "15px", 
                zIndex: "1000",
                width: '36px',
                height: '36px',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: 'all 0.3s ease'
              }}>
                <FaCamera className="text-warning" size={16}/>
              </div>
            </label>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="d-none"
            />
          </div>
          
          <h2 className="fw-bold mb-1 text-white">{user?.username || 'Hungry Customer'}</h2>
          <p className="opacity-85 mb-0 text-white">{user?.email || 'No email provided'}</p>
          
          <div className="d-flex justify-content-center mt-3 gap-2">
            <span className="badge bg-white text-warning fw-semibold px-3 py-2">
              <FaHamburger className="me-1" />
              Burger Fan
            </span>
            <span className="badge bg-white text-warning fw-semibold px-3 py-2">
              <FaIceCream className="me-1" />
              Dessert Lover
            </span>
          </div>
        </div>
        <div className="card-body px-4 py-5">
          <div className="mb-5">
            <h5 className="mb-3 text-warning fw-bold d-flex align-items-center">
              <FaUser className="me-2 fs-4" />
              <span className="border-bottom border-warning pb-1">Personal Information</span>
            </h5>
            <hr className="my-3" style={{ borderColor: 'rgba(253, 126, 20, 0.2)' }} />
            <div className="row gy-4">
              <div className="col-md-6 d-flex">
                <div className="bg-light rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ 
                  width: '48px', 
                  height: '48px',
                  backgroundColor: 'rgba(253, 126, 20, 0.1)'
                }}>
                  <FaUser className="text-warning" />
                </div>
                <div>
                  <div className="text-muted small mb-1">Full Name</div>
                  <div className="fw-semibold fs-5">{user?.username || 'Not specified'}</div>
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="bg-light rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ 
                  width: '48px', 
                  height: '48px',
                  backgroundColor: 'rgba(253, 126, 20, 0.1)'
                }}>
                  <FaEnvelope className="text-warning" />
                </div>
                <div>
                  <div className="text-muted small mb-1">Email</div>
                  <div className="fw-semibold fs-5">{user?.email || 'Not specified'}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="mb-3 text-warning fw-bold d-flex align-items-center">
              <FaUserShield className="me-2 fs-4" />
              <span className="border-bottom border-warning pb-1">Food Preferences</span>
            </h5>
            <hr className="my-3" style={{ borderColor: 'rgba(253, 126, 20, 0.2)' }} />
            <p className="mb-3 text-muted">Your favorite food categories:</p>
            <div className="d-flex flex-wrap gap-3">
              <span className="badge rounded-pill bg-light text-warning border border-warning border-2 fw-semibold px-4 py-2 d-flex align-items-center">
                <FaHamburger className="me-2 flex-shrink-0" />
                Burgers
              </span>
              <span className="badge rounded-pill bg-light text-warning border border-warning border-2 fw-semibold px-4 py-2 d-flex align-items-center">
                <FaPizzaSlice className="me-2 flex-shrink-0" />
                Pizza
              </span>
              <span className="badge rounded-pill bg-light text-warning border border-warning border-2 fw-semibold px-4 py-2 d-flex align-items-center">
                <FaIceCream className="me-2 flex-shrink-0" />
                Desserts
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-light p-4 d-flex justify-content-center gap-3 flex-wrap" style={{ backgroundColor: 'rgba(253, 126, 20, 0.05)' }}>
          <button  
            onClick={handleOpen}
            className="btn btn-warning btn-lg rounded-pill px-4 shadow-sm d-flex align-items-center"
            style={{
              background: 'linear-gradient(45deg, #fd7e14, #ffc107)',
              border: 'none',
              minWidth: '180px',
              color: 'white'
            }}
          >
            <FaEdit className="me-2" />
            Edit Profile
          </button>
          <button 
            onClick={() => setPasswordOpen(true)}
            className="btn btn-outline-warning btn-lg rounded-pill px-4 shadow-sm d-flex align-items-center"
            style={{
              borderWidth: '2px',
              minWidth: '180px',
              color: '#fd7e14'
            }}
          >
            <FaLock className="me-2" />
            Change Password
          </button>
        </div>
      </div>
      
      <ProfileForm open={open} onClose={handleClose} handleEdit={handleEdit} />
      <PasswordForm passwordOpen={passwordOpen} handlePasswordClose={handlePasswordClose}/>
    </div>
  );
}

export default Profile;