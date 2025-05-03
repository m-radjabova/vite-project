import { FaChalkboardTeacher, FaCalendarAlt, FaCog, FaBell, FaSearch, FaSignOutAlt, FaUser, FaChevronDown } from "react-icons/fa";
import useContextPro from "../../hooks/useContextPro";
import Dropdown from 'react-bootstrap/Dropdown';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { RiArrowDropRightLine } from "react-icons/ri";
import { GrArticle } from "react-icons/gr";

function Teacher() {
  const { state: { user } } = useContextPro();

  const getInitials = (name: string) => {
    if (!name) return 'US';
    const parts = name.split(' ');
    return parts.map(part => part[0]).join('').toUpperCase();
  };

  return (
    <div className="teacher-dashboard" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand navbar-light bg-white shadow-sm" style={{ height: '70px' }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <FaChalkboardTeacher className="text-primary me-2" size={24} />
            <span className="navbar-brand fw-bold">Teacher Dashboard</span>
          </div>
          
          <div className="d-flex align-items-center mx-4" style={{ width: '400px' }}>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Search students, classes..." 
              />
            </div>
          </div>
          
          <div className="d-flex align-items-center ms-auto">
            <button className="btn btn-light position-relative mx-2">
              <FaBell size={18} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
            
            <Dropdown>
              <Dropdown.Toggle 
                variant="light" 
                id="dropdown-profile" 
                className="d-flex align-items-center border-0 bg-transparent shadow-none"
              >
                <div className="position-relative me-2">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center" 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)' 
                    }}
                  >
                    <span className="text-white fw-bold">{getInitials(user?.username || '')}</span>
                  </div>
                  <span className="position-absolute bottom-0 end-0 p-1 bg-success rounded-circle border border-2 border-white"></span>
                </div>
                <span className="d-none d-lg-inline fw-medium">{user?.username || 'Teacher'}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow border-0 mt-2">
                <Dropdown.Item href="#profile" className="d-flex align-items-center">
                  <FaUser className="me-2 text-muted" /> 
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item href="#settings" className="d-flex align-items-center">
                  <FaCog className="me-2 text-muted" /> 
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#logout" className="d-flex align-items-center text-danger">
                  <FaSignOutAlt className="me-2" /> 
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar bg-dark text-white p-3" style={{ 
          width: '320px', 
          minHeight: 'calc(100vh - 70px)',
          background: 'linear-gradient(180deg, #2c3e50 0%, #1a1a2e 100%)'
        }}>
          {/* User Profile Section */}
          <div className="d-flex align-items-center mb-4 p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <div className="position-relative me-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" 
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)' 
                }}>
                <span className="text-white fw-bold" style={{ fontSize: '1.25rem' }}>
                  {getInitials(user?.username || '')}
                </span>
              </div>
              <span className="position-absolute bottom-0 end-0 p-1 bg-success rounded-circle border border-2 border-dark"></span>
            </div>
            <div>
              <div className="fw-bold">{user?.username || 'Teacher'}</div>
              <small className="text-white-50">
                {user?.roles?.includes('TEACHER') ? 'Teacher' : 'Educator'}
              </small>
            </div>
          </div>
          
          <hr className="bg-light opacity-25 my-3" />
          
          {/* Navigation Menu */}
          <ul className="nav nav-pills flex-column">
            <li className="nav-item mb-2">
              <NavLink
                to="/teacher" 
                end
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
                style={({ isActive }) => ({ 
                  padding: '0.5rem 1rem',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderLeft: isActive ? '3px solid #3a7bd5' : 'none',
                  borderRadius: '4px',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.8)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                })}
              >
                <FaUser className="me-3" />
                <span>Profile</span>
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <Accordion
                defaultExpanded={location.pathname.includes('/teacher/ochiqdars') || location.pathname.includes('/teacher/bildirgi')}
                disableGutters
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <AccordionSummary
                  expandIcon={<FaChevronDown className="text-white" />}
                  sx={{
                    padding: '0.5rem 1rem',
                    minHeight: 'auto !important',
                    borderRadius: '4px',
                    backgroundColor: location.pathname.includes('/teacher/ochiqdars') || location.pathname.includes('/teacher/bildirgi') 
                      ? 'rgba(255,255,255,0.1)' 
                      : 'transparent',
                    borderLeft: location.pathname.includes('/teacher/ochiqdars') || location.pathname.includes('/teacher/bildirgi')
                      ? '3px solid #3a7bd5' 
                      : 'none',
                    color: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                    '&.Mui-expanded': {
                      minHeight: 'auto !important',
                      color: 'white',
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: '0 !important',
                      '&.Mui-expanded': { margin: '0 !important' }
                    }
                  }}
                >
                  <div className="d-flex align-items-center">
                    <FaCalendarAlt className="me-3" />
                    <span>Schedule</span>
                  </div>
                </AccordionSummary>
                
                <AccordionDetails sx={{ padding: 0 }}>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <NavLink
                        to="/teacher/ochiqdars"
                        className={({ isActive }) => 
                          `nav-link d-flex align-items-center ps-5 ${isActive ? 'active' : ''}`
                        }
                        style={({ isActive }) => ({
                          marginTop: '0.5rem', 
                          padding: '0.5rem 1rem',
                          backgroundColor: isActive ? 'rgba(107, 106, 106, 0.2)' : 'transparent',
                          color: isActive ? 'white' : 'rgba(228, 225, 225, 0.7)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          }
                        })}
                      >
                        <span>
                          <RiArrowDropRightLine className="me-2"/> Applications
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/teacher/bildirgi"
                        className={({ isActive }) => 
                          `nav-link d-flex align-items-center ps-5 ${isActive ? 'active' : ''}`
                        }
                        style={({ isActive }) => ({ 
                          marginTop: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: isActive ? 'rgba(107, 106, 106, 0.2)' : 'transparent',
                          color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          }
                        })}
                      >
                        <span> 
                          <RiArrowDropRightLine className="me-2"/> Announcement
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/teacher/article"
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
                style={({ isActive }) => ({ 
                  padding: '0.5rem 1rem',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderLeft: isActive ? '3px solid #3a7bd5' : 'none',
                  borderRadius: '4px',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.8)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                })}
              >
                <GrArticle className="me-3" />
                <span>Article</span>
              </NavLink>
            </li>
          </ul>
        </div>
  
        <div className="main-content flex-grow-1 p-4">
      
          <div className="card border-0 shadow-sm mb-4" style={{ 
            background: 'linear-gradient(135deg, rgba(58,123,213,0.1) 0%, rgba(0,210,255,0.05) 100%)',
            borderLeft: '4px solid #3a7bd5'
          }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teacher;