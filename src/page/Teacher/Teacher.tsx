import { FaChalkboardTeacher, FaHome, FaCalendarAlt, FaUserGraduate, FaChartLine, FaCog, FaBell, FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { BiBookAlt } from "react-icons/bi";
import useContextPro from "../../hooks/useContextPro";
import Dropdown from 'react-bootstrap/Dropdown';

function Teacher() {
  const { state: { user } } = useContextPro();


  const getInitials = (name: string) => {
    if (!name) return 'US';
    const parts = name.split(' ');
    return parts.map(part => part[0]).join('').toUpperCase();
  };

  return (
    <div className="teacher-dashboard" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

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
              <Dropdown.Toggle variant="light" id="dropdown-custom" className="d-flex align-items-center custom-dropdown-toggle">
                <div className="position-relative me-2 avatar-wrapper">
                  <div className="avatar-circle">
                    <span className="text-white fw-bold">{getInitials(user?.username || '')}</span>
                  </div>
                  <span className="status-indicator"></span>
                </div>
                <span className="d-none d-lg-inline fw-medium">{user?.username || 'Teacher'}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow dropdown-custom-menu">
                <Dropdown.Item href="#profile"><FaUserGraduate className="me-2" /> My Profile</Dropdown.Item>
                <Dropdown.Item href="#settings"><FaCog className="me-2" /> Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#logout" className="text-danger"><FaSignOutAlt className="me-2" /> Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        <div className="sidebar bg-dark text-white p-3" style={{ width: '250px', minHeight: 'calc(100vh - 70px)' }}>

          <div className="d-flex align-items-center mb-4 p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <div className="position-relative me-3">
              <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)' }}>
                <span className="text-white fw-bold" style={{ fontSize: '1.25rem' }}>{getInitials(user?.username || '')}</span>
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
              <a className="nav-link active d-flex align-items-center" href="#">
                <FaHome className="me-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white-50 d-flex align-items-center" href="#">
                <MdQuiz className="me-3" />
                <span>Quizzes</span>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white-50 d-flex align-items-center" href="#">
                <FaUserGraduate className="me-3" />
                <span>Students</span>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white-50 d-flex align-items-center" href="#">
                <FaCalendarAlt className="me-3" />
                <span>Schedule</span>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white-50 d-flex align-items-center" href="#">
                <BiBookAlt className="me-3" />
                <span>Gradebook</span>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white-50 d-flex align-items-center" href="#">
                <FaChartLine className="me-3" />
                <span>Analytics</span>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white-50 d-flex align-items-center" href="#settings">
                <FaCog className="me-3" />
                <span>Settings</span>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white-50 d-flex align-items-center" href="#">
                <FaBell className="me-3" />
                <span>Notifications</span>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white-50 d-flex align-items-center" href="#profile">
                <FaUser className="me-3" />
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content flex-grow-1 p-4">
          {/* Welcome Card */}
          <div className="card border-0 shadow-sm mb-4" style={{ 
            background: 'linear-gradient(135deg, rgba(58,123,213,0.1) 0%, rgba(0,210,255,0.05) 100%)',
            borderLeft: '4px solid #3a7bd5'
          }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold text-primary">Welcome back, {user?.username || 'Teacher'}!</h5>
                  <p className="text-muted mb-0">You have 3 classes today with 15 assignments to grade</p>
                </div>
                <button className="btn btn-outline-primary">View Schedule</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Teacher;