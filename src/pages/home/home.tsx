import { Link, Outlet } from 'react-router-dom';
import './home.css';

import { loadModals } from '../../services/faceid';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [modelStatus, setModelStatus] = useState<string>('Models Loading');

  useEffect(() => {
    loadModals().then(() => {
      setModelStatus('Modals Loaded');
    });
  }, []);

  return (
    <>
      <div id="sidebar">
        <h2>Navigation</h2>
        <nav>
          <ul>
            <li>
                <Link to={''}>Home</Link>
            </li>
            <li>
              <Link to={`imageprocessing`}>FaceID</Link>
            </li>
          </ul>
          <p>{modelStatus}</p>
        </nav>
      </div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
};

export default Home;