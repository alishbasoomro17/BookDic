
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './components/Nav';

const Main = () => {
  const history = useNavigate();

  const handleBookSummaryClick = () => {
    history('/summary-search');
  };

  const handleBookSearchClick = () => {
    history('/book-search');
  };

  return (
    <>
    <Nav/>
    <div className="combined-component">
      <div className="widget-card" onClick={handleBookSummaryClick}>
        <h3 className='fancy'>Book Summary</h3>
        <p>Click to navigate to the Book Summary page.</p>
      </div>
      <div className="widget-card" onClick={handleBookSearchClick}>
        <h3 className='fancy'>Book Search</h3>
        <p>Click to navigate to the Book Search page.</p>
      </div>
    </div>
    </>
  );
};

export default Main;
