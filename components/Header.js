import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";


export default function Header({ setStreamerName, inputValue, setInputValue }) {
  

  function handleSubmit(e) {
    e.preventDefault();
    setStreamerName(inputValue);
  }

  return (
    <div className='headerContainer'>
        <h1 className="mainHeader">Twitch Check-In</h1>
      <div className="inputSection">
        
        <form onSubmit={handleSubmit} className='formWrapper'>
          
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Streamer Name"
            className='inputField'
          />
          <button type="submit" className="searchButton"><i><FaArrowRight className='searchArrow'/></i></button>
        </form>
      </div>
    </div>
  );
}
