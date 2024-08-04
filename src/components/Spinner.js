import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Spinner = () => {
  return (
    <center>
    <div class="spinner-grow text-success" style={{width: '3rem', height: '3rem', role:"status",marginTop:'200px'}}>
    <span class="visually-hidden">Loading...</span>
  
  </div>
  <p className='text-center text-success'>Directing.....</p>
  </center>
  );
};

export default Spinner;
