import { FaCalendarAlt, FaUser, FaChevronDown } from "react-icons/fa";
import useContextPro from "../../hooks/useContextPro";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { RiArrowDropRightLine } from "react-icons/ri";
import { GrArticle } from "react-icons/gr";
import TopNavigatorBar from "./TopNavigatorBar";
import { getAccordionSummaryStyle, getNavLinkStyle, getSubNavLinkStyle } from "./StyleNavlink";

function Teacher() {
  const { state: { user } } = useContextPro();

  const getInitials = (name: string) => {
    if (!name) return 'US';
    const parts = name.split(' ');
    return parts.map(part => part[0]).join('').toUpperCase();
  };

  const location = useLocation();
  const isScheduleExpanded =
    location.pathname.includes('/teacher/ochiqdars') ||
    location.pathname.includes('/teacher/bildirgi');

  return (
    <div className="teacher-dashboard" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

      <TopNavigatorBar getInitials={getInitials} />

      <div className="d-flex">
        <div className="sidebar bg-dark text-white p-3" style={{ 
          width: '320px', 
          minHeight: 'calc(100vh - 70px)',
          background: 'linear-gradient(180deg, #2c3e50 0%, #1a1a2e 100%)'
        }}>
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
          
          <ul className="nav nav-pills flex-column">
            <li className="nav-item mb-2">
              <NavLink
                to="/teacher"
                end
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
                style={({ isActive }) => getNavLinkStyle(isActive)}
              >
                <FaUser className="me-3" />
                <span>Profile</span>
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <Accordion
                defaultExpanded={isScheduleExpanded}
                disableGutters
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <AccordionSummary
                  expandIcon={<FaChevronDown className="text-white" />}
                  sx={getAccordionSummaryStyle(isScheduleExpanded)}
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
                        style={({ isActive }) => getSubNavLinkStyle(isActive)}
                      >
                        <RiArrowDropRightLine className="me-2" />
                        <span>Applications</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/teacher/bildirgi"
                        className={({ isActive }) =>
                          `nav-link d-flex align-items-center ps-5 ${isActive ? 'active' : ''}`
                        }
                        style={({ isActive }) => getSubNavLinkStyle(isActive)}
                      >
                        <RiArrowDropRightLine className="me-2" />
                        <span>Announcement</span>
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
                style={({ isActive }) => getNavLinkStyle(isActive)}
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