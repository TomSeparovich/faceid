import { Link, Outlet } from 'react-router-dom';
import './home.css';

const Home: React.FC = () => {

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
            </nav>
          </div>
          <div id="main">
            <Outlet />
          </div>
        </>
      );
};

export default Home;