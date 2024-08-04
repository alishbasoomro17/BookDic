import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBookAtlas } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Toggle the theme
  const toggleTheme = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  // Initialize theme based on user's preference
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Handler for navigation
  const handleNavigateToDict = () => {
    navigate('/dictionary');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-success'}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#"> ﷽</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn ni" onClick={handleNavigateToDict}>
                <FontAwesomeIcon icon={faBookAtlas} size="2x" />
              </button>
            </li>
            <li className="nav-item">
              <button className="btn ni theme-toggle" onClick={toggleTheme}>
                <FontAwesomeIcon icon={darkMode ? faMoon : faSun} size="2x" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
