import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
// import CreateContextPro from './hooks/CreateContextPro';
import { ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')!).render(
    <>
      <App/>
      <ToastContainer />
    </>
  );