import { FaCalendarAlt, FaCog, FaUser } from "react-icons/fa";
import { LuFlower2 } from "react-icons/lu";
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
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
      transition: 'all 0.3s ease'
    }}>
      <h2 className="mb-0 fs-5 fw-semibold" style={{
        color: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        letterSpacing: '0.5px'
      }}>
        <LuFlower2 style={{ 
          color: '#2a7f62',
          fontSize: '1.4em',
          opacity: 0.9
        }} />
        <span style={{ color: '#2a7f62' }}>Floral</span>
        <span style={{ color: '#2a7f62' }} >Haven</span>
      </h2>
            
      <div className="d-flex align-items-center gap-4" style={{ color: '#555' }}>
        <button 
          onClick={() => navigate('/admin/profile')} 
          style={{
            color: 'rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#2a7f62';
            e.currentTarget.style.backgroundColor = 'rgba(42, 127, 98, 0.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <FaCog size={16} style={{ marginRight: '6px' }} />
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Settings</span>
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
            color: 'rgba(0, 0, 0, 0.6)',
            padding: '6px 10px',
            borderRadius: '8px',
          }}
          onClick={() => setShowCalendar(!showCalendar)}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#2a7f62';
            e.currentTarget.style.backgroundColor = 'rgba(42, 127, 98, 0.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <FaCalendarAlt style={{ marginRight: '8px', fontSize: '14px' }} />
          <span>
            {startDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
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
              borderRadius: '12px',
              boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)',
              padding: '12px',
              marginTop: '8px',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date !== null) setStartDate(date);
                  setShowCalendar(false); 
                }}
                inline
                calendarClassName="floral-calendar"
              />
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          color: '#1a1a1a',
          padding: '6px 12px',
          borderRadius: '8px',
          backgroundColor: 'rgba(42, 127, 98, 0.1)',
          transition: 'all 0.3s ease'
        }}>
          <FaUser style={{ 
            marginRight: '8px', 
            color: '#2a7f62',
            fontSize: '0.9em'
          }} />
          <span style={{ 
            fontSize: '14px',
            color: '#2a7f62'
          }}>
            {user?.username || 'Admin'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopNavigatorBar;