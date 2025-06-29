import { FaCalendarAlt, FaCog, FaUser } from "react-icons/fa";
import { GiStrawberry } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { useState } from "react";
import useContextPro from "../../hooks/useContextPro";

function TopNavigatorBar() {
    const { state: { user }} = useContextPro();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

  return (
     <div className="px-4 py-3 d-flex align-items-center justify-content-between" style={{
              background: 'rgba(255, 245, 245, 0.8)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 2px 10px rgba(255, 192, 203, 0.2)',
              position: 'sticky',
              top: 0,
              zIndex: 5,
              borderBottom: '1px solid rgba(255, 182, 193, 0.3)'
            }}>
              <h2 className="mb-0 fs-5 fw-semibold" style={{
                color: '#d23c67',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <GiStrawberry style={{ 
                  color: '#ff6b8b',
                  fontSize: '1.4em'
                }} />
                <span>Sweet Scoops</span>
                <span style={{
                  background: 'linear-gradient(90deg, #d23c67, #ff6b8b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700
                }}>Dashboard</span>
              </h2>
              
              <div className="d-flex align-items-center gap-4">
                <button onClick={() => navigate('/admin/profile')} className="btn p-0 btn-setting" style={{
                  color: '#ff8fab',
                  transition: 'all 0.3s ease'
                }}>
                  <FaCog size={18} />
                </button>
                
                <div className="d-flex align-items-center" style={{
                  color: '#ff8fab',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }} onClick={() => setShowCalendar(!showCalendar)}
                 >
                  <FaCalendarAlt className="me-2" />
                  <span>
                    {startDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {showCalendar && (
                    <div style={{ position: 'absolute', top: '100%', zIndex: 1000 }}>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          if (date !== null) {
                            setStartDate(date);
                          }
                          setShowCalendar(false); 
                        }}
                        inline
                      />
                    </div>
                  )}
                </div>
    
                <div className="d-flex align-items-center">
                    <FaUser className="me-2" style={{ color: '#ff8fab' }} />
                    <span className="fw-semibold" style={{ color: '#d23c67' }}>
                      {user?.username || 'Admin'}
                    </span>
                </div>
              </div>
            </div>
  )
}

export default TopNavigatorBar