import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
// import CreateContextPro from './hooks/CreateContextPro';
import { ToastContainer} from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <>
    <Router>
      <App/>
      <ToastContainer />
    </Router>
    </>
  );