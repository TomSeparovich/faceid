import { Link, Outlet } from 'react-router-dom';
import './home.css';

import { loadLabeledImages, loadModals } from '../../services/faceid';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [modelStatus, setModelStatus] = useState<string>('Models Loading');

  useEffect(() => {
    loadModals().then(() => {
      setModelStatus('Models Loaded');
      loadLabeledImages();
    });
  }, []);


  return (
    <>
      <div id="sidebar">
        <h2>Navigation</h2>
        <nav>
          <ul>
            <li><Link to={`imageprocessing`}>Image Processing</Link></li>
            <li><Link to={`dbmanage`}>Database Management</Link></li>
            <li><Link to={''}>Home</Link></li>
          </ul>
        </nav>
        <p>{modelStatus}</p>
      </div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
};

export default Home;