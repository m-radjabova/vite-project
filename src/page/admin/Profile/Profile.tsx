import { FaUser, FaEnvelope, FaEdit, FaLock, FaCamera, FaRegComments, FaRegNewspaper, FaBoxOpen } from 'react-icons/fa';
import { LuFlower2 } from "react-icons/lu";
import useContextPro from '../../../hooks/useContextPro';
import ProfileForm from './ProfileFom';
import { ChangeEvent, useState } from 'react';
import apiClient from '../../../apiClient/ApiClient';
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
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          {/* Decorative elements */}
          <div className="decorative-circle decorative-circle-1"></div>
          <div className="decorative-circle decorative-circle-2"></div>
          
          {/* Profile badge */}
          <div className="profile-badge">
            <span className="badge-content">
              <LuFlower2 className="me-1" />
              Floral Admin
            </span>
          </div>
          
          {/* Profile picture */}
          <div className="profile-picture-container">
            <div className="profile-picture-float">
              <label 
                htmlFor="image-upload"
                className="profile-picture-label"
              >
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Profile" 
                    className="profile-image"
                  />
                ) : user?.username ? (
                  <span className="profile-initial">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <FaUser className="profile-icon" />
                )}
                <div className="profile-camera-icon">
                  <FaCamera />
                </div>
              </label>
            </div>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="hidden-input"
            />
          </div>
          
          {/* User info */}
          <div className="user-info">
            <h2 className="user-name">
              {user?.username || 'Admin User'}
            </h2>
            <p className="user-email">
              {user?.email || 'admin@floralhaven.com'}
            </p>
          </div>
        </div>
        
        {/* Personal Information Section */}
        <div className="profile-body">
          <div className="section-container">
            <div className="section-header">
              <div className="section-icon">
                <FaUser />
              </div>
              <h5 className="section-title">
                Personal Information
              </h5>
            </div>
            
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <FaUser />
                </div>
                <div>
                  <div className="info-label">Full Name</div>
                  <div className="info-value">
                    {user?.username || 'Not specified'}
                  </div>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <div className="info-label">Email</div>
                  <div className="info-value">
                    {user?.email || 'Not specified'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Section */}
          <div className="section-container">
            <div className="section-header">
              <div className="section-icon">
                <FaRegNewspaper />
              </div>
              <h5 className="section-title">
                Recent Activity
              </h5>
            </div>
            
            <p className="activity-description">
              Your latest actions in the system
            </p>
            
            <div className="activity-badges">
              <span className="activity-badge">
                <FaRegNewspaper className="badge-icon" />
                Added new flower
              </span>
              <span className="activity-badge">
                <FaRegComments className="badge-icon" />
                Approved review
              </span>
              <span className="activity-badge">
                <FaBoxOpen className="badge-icon" />
                Updated inventory
              </span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="profile-actions">
          <button  
            onClick={handleOpen}
            className="action-btn action-btn-primary"
          >
            <FaEdit className="btn-icon" />
            Edit Profile
          </button>
          
          <button 
            onClick={() => setPasswordOpen(true)}
            className="action-btn action-btn-secondary"
          >
            <FaLock className="btn-icon" />
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