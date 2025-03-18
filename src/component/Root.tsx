import { StrictMode, useEffect, useState } from 'react';
import App from '../App';

const Root = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StrictMode>
      {showIntro ? (
        <div className="intro">
          <h1>Welcome 💜</h1>
        </div>
      ) : (
        <App />
      )}
    </StrictMode>
  );
};

export default Root;