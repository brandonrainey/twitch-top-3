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
          
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Streamer Name"
            className='inputField'
          />
          <button type="submit"><i class="icon ion-android-arrow-forward"></i></button>
        </form>
      </div>
    </div>
  );
}
