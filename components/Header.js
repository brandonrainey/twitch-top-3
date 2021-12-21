import React, { useState } from "react";

export default function Header({ setStreamerName, inputValue, setInputValue }) {
  

  function handleSubmit(e) {
    e.preventDefault();
    setStreamerName(inputValue);
  }

  return (
    <div className='headerContainer'>
        <h1 className="mainHeader">Twitch Check-In</h1>
      <div className="inputSection">
        
        <form onSubmit={handleSubmit}>
          <label>Streamer Name:</label>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}
