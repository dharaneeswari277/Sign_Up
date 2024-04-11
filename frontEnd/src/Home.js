import React from 'react';
import './App.css';


const HomePage = () => {
  return (
    <div>
      <div className="appbar">
        <h1 style={{marginLeft:'30px'}}>HOMEE</h1>
            <a href="/">New & Accepted</a>
            <a href="/">Dispatched</a>
            <a href="/">Delivered</a>
      </div>
    </div>
  );
}

export default HomePage;
