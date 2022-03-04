import React from 'react';
import { useState } from 'react';

const ControlsComponent = ({ setShowAddEntity, inputHandler }) => {  

  return (
    <form className="non-table-content">
        <div className="search-container">
            <img src="../icon/search.svg" alt="Search icon"/>
            <input className="search" type="text" placeholder="Search"
            onChange={inputHandler}/>
        </div>
        <button className="blue-btn entity-add-btn" type="button"
        onClick={() => setShowAddEntity(true)}>Add user</button>
    </form>

  )
}

export default ControlsComponent