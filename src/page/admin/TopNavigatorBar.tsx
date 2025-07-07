import { FaCalendarAlt, FaCog, FaSprayCan, FaUser } from "react-icons/fa";
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
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease'
    }}>
      <h2 className="mb-0 fs-5 fw-semibold" style={{
        color: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        letterSpacing: '0.5px'
      }}>
        <FaSprayCan style={{ 
          color: '#1a1a1a',
          fontSize: '1.4em',
          opacity: 0.8
        }} />
        <span>Essence</span>
        <span style={{
          background: 'linear-gradient(90deg, #1a1a1a, #444)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700
        }}>Dashboard</span>
      </h2>
            
      <div className="d-flex align-items-center gap-4" style={{ color: '#444' }}>
        <button 
          onClick={() => navigate('/admin/profile')} 
          style={{
            color: 'rgba(0, 0, 0, 0.6)',
            transition: 'all 0.3s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)'}
        >
          <FaCog size={18} />
        </button>
                
        <div 
          style={{
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            color: 'rgba(0, 0, 0, 0.7)'
          }}
          onClick={() => setShowCalendar(!showCalendar)}
          onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0, 0, 0, 0.7)'}
        >
          <FaCalendarAlt style={{ marginRight: '8px', opacity: 0.7 }} />
          <span>
            {startDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          {showCalendar && (
            <div style={{ 
              position: 'absolute', 
              top: '100%', 
              right: 0,
              zIndex: 1000,
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              padding: '8px',
              marginTop: '8px'
            }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date !== null) setStartDate(date);
                  setShowCalendar(false); 
                }}
                inline
              />
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 600,
          color: '#1a1a1a'
        }}>
          <FaUser style={{ 
            marginRight: '8px', 
            opacity: 0.7,
            fontSize: '0.9em'
          }} />
          <span style={{ fontSize: '14px' }}>
            {user?.username || 'Admin'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopNavigatorBar