import { createRoot } from 'react-dom/client';
import Root from './component/Root.tsx';
import './index.css'; 

createRoot(document.getElementById('root')!).render(
    <Root />
);
