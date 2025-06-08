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
  avatar: string | File;
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
        ...(data.avatar && { avatar: data.avatar })
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

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      try {
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await apiClient.post(`/users/${user?.id}/avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setPreview(URL.createObjectURL(file));
        dispatch({ type: 'EDIT_USER', payload: response.data });
        toast.success('Profile picture updated successfully!');
      } catch (error) {
        console.error('Avatar upload failed:', error);
        toast.error('Failed to upload profile picture');
      }
    }
  };
  
  return (
    <div className="container-fluid py-5">
      <div className="card border-0 rounded-4 overflow-hidden" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(253, 126, 20, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}>
        <div 
          className="text-white text-center py-5 position-relative"
          style={{
            background: 'linear-gradient(135deg, rgba(253,126,20,0.9) 0%, rgba(255,193,7,0.9) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)'
          }}></div>
          <div className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-white text-warning fw-semibold px-3 py-2 rounded-pill shadow-sm" style={{
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 193, 7, 0.3)'
            }}>
              <FaStar className="me-1" />
              Food Connoisseur
            </span>
          </div>
          <div className="d-flex justify-content-center mb-4 position-relative">
            <div style={{
              position: 'relative',
              transform: 'translateY(0)',
              animation: 'float 6s ease-in-out infinite',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
            }}>
             <label 
                htmlFor="image-upload"
                className="rounded-circle bg-white text-warning d-flex justify-content-center align-items-center position-relative"
                style={{
                  width: '140px',
                  height: '140px',
                  fontSize: '48px',
                  border: '4px solid rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 20px rgba(253, 126, 20, 0.3)'
                }}
              >
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Profile" 
                    className="w-100 h-100 object-cover"
                  />
                ) : user?.avatar ? (
                  <img 
                    src={user.avatar} 
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
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(2px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <FaCamera className="text-warning" size={16}/>
                </div>
              </label>
            </div>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="d-none"
            />
          </div>
          <div style={{
            position: 'relative',
            zIndex: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 className="fw-bold mb-1 text-white" style={{ fontSize: '2rem' }}>
              {user?.username || 'Gourmet Explorer'}
            </h2>
            <p className="opacity-85 mb-0 text-white" style={{ fontSize: '1.1rem' }}>
              {user?.email || 'foodie@example.com'}
            </p>
          </div>
          <div className="d-flex justify-content-center mt-4 gap-3">
            <span className="badge bg-white text-warning fw-semibold px-3 py-2 rounded-pill shadow-sm" style={{
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 193, 7, 0.3)'
            }}>
              <FaHamburger className="me-1" />
              Burger Artisan
            </span>
            <span className="badge bg-white text-warning fw-semibold px-3 py-2 rounded-pill shadow-sm" style={{
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 193, 7, 0.3)'
            }}>
              <FaIceCream className="me-1" />
              Dessert Maestro
            </span>
          </div>
        </div>
        <div className="card-body px-4 py-5">
          <div className="mb-5">
            <div className="d-flex align-items-center mb-4">
              <div className="me-3" style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(253,126,20,0.1) 0%, rgba(255,193,7,0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)'
              }}>
                <FaUser className="text-warning" />
              </div>
              <h5 className="text-warning fw-bold mb-0" style={{ fontSize: '1.25rem' }}>
                Personal Information
              </h5>
            </div>
            
            <div className="row gy-4">
              <div className="col-md-6">
                <div className="p-4 rounded-3" style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  boxShadow: '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="d-flex align-items-center">
                    <div className="me-3" style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(253,126,20,0.1) 0%, rgba(255,193,7,0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FaUser className="text-warning" />
                    </div>
                    <div>
                      <div className="text-muted small mb-1">Full Name</div>
                      <div className="fw-semibold" style={{ fontSize: '1.1rem' }}>
                        {user?.username || 'Not specified'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="p-4 rounded-3" style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  boxShadow: '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="d-flex align-items-center">
                    <div className="me-3" style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(253,126,20,0.1) 0%, rgba(255,193,7,0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FaEnvelope className="text-warning" />
                    </div>
                    <div>
                      <div className="text-muted small mb-1">Email</div>
                      <div className="fw-semibold" style={{ fontSize: '1.1rem' }}>
                        {user?.email || 'Not specified'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex align-items-center mb-4">
              <div className="me-3" style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(253,126,20,0.1) 0%, rgba(255,193,7,0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)'
              }}>
                <FaUserShield className="text-warning" />
              </div>
              <h5 className="text-warning fw-bold mb-0" style={{ fontSize: '1.25rem' }}>
                Food Preferences
              </h5>
            </div>
            
            <p className="mb-3 text-muted" style={{ fontSize: '0.95rem' }}>
              Your culinary taste profile
            </p>
            
            <div className="d-flex flex-wrap gap-3">
              <span className="badge rounded-pill px-4 py-2 d-flex align-items-center" style={{
                background: 'rgba(255, 255, 255, 0.7)',
                color: '#fd7e14',
                border: '1px solid rgba(253, 126, 20, 0.2)',
                boxShadow: '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)',
                backdropFilter: 'blur(4px)'
              }}>
                <FaHamburger className="me-2 flex-shrink-0" />
                Artisan Burgers
              </span>
              <span className="badge rounded-pill px-4 py-2 d-flex align-items-center" style={{
                background: 'rgba(255, 255, 255, 0.7)',
                color: '#fd7e14',
                border: '1px solid rgba(253, 126, 20, 0.2)',
                boxShadow: '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)',
                backdropFilter: 'blur(4px)'
              }}>
                <FaPizzaSlice className="me-2 flex-shrink-0" />
                Gourmet Pizza
              </span>
              <span className="badge rounded-pill px-4 py-2 d-flex align-items-center" style={{
                background: 'rgba(255, 255, 255, 0.7)',
                color: '#fd7e14',
                border: '1px solid rgba(253, 126, 20, 0.2)',
                boxShadow: '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)',
                backdropFilter: 'blur(4px)'
              }}>
                <FaIceCream className="me-2 flex-shrink-0" />
                Decadent Desserts
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 d-flex justify-content-center gap-3 flex-wrap" style={{
          background: 'rgba(255, 255, 255, 0.7)',
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <button  
            onClick={handleOpen}
            className="btn btn-lg rounded-pill px-4 d-flex align-items-center position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(45deg, #fd7e14, #ffc107)',
              border: 'none',
              minWidth: '180px',
              color: 'white',
              boxShadow: '0 4px 15px rgba(253, 126, 20, 0.3)',
              zIndex: 1
            }}
          >
            <span className="position-relative z-index-2">
              <FaEdit className="me-2" />
              Edit Profile
            </span>
            <span className="position-absolute top-0 left-0 w-100 h-100 bg-white opacity-0 hover-effect" style={{
              transition: 'all 0.4s ease',
              zIndex: -1
            }}></span>
          </button>
          
          <button 
            onClick={() => setPasswordOpen(true)}
            className="btn btn-lg rounded-pill px-4 d-flex align-items-center position-relative overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(253, 126, 20, 0.3)',
              minWidth: '180px',
              color: '#fd7e14',
              boxShadow: '0 4px 15px rgba(253, 126, 20, 0.1)',
              zIndex: 1
            }}
          >
            <span className="position-relative z-index-2">
              <FaLock className="me-2" />
              Change Password
            </span>
            <span className="position-absolute top-0 left-0 w-100 h-100 bg-warning opacity-0 hover-effect" style={{
              transition: 'all 0.4s ease',
              zIndex: -1
            }}></span>
          </button>
        </div>
      </div>
          <ProfileForm open={open} onClose={handleClose} handleEdit={handleEdit} />
          <PasswordForm passwordOpen={passwordOpen} handlePasswordClose={handlePasswordClose}/>
    </div>
  );
}

export default Profile;