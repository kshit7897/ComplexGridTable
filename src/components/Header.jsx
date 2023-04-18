import React, { useContext } from "react";

import { MainContext } from "../context/MainContext";

import "./header.css";


const Header = () => {
  
const {setSearchQuery,searchQuery, selectedShape,setSelectedShape} = useContext(MainContext);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShapeChange = (event) => {
   setSelectedShape(event.target.value);
  };

  return (
    <>
    <div className="container">
    <div className="main-div">
      <input
        className="search-bar"
        type="text"
        placeholder="Search here"
        value={searchQuery}
        onChange={handleSearch}
      />
<div className="shape-dropdown">
        <label htmlFor="shape-select">Select shape : </label>
        <select
          id="shape-select"
          value={selectedShape}
          onChange={handleShapeChange}
        >
          <option value="">All</option>
          <option value="ROUND">Round</option>
          <option value="PRINCESS">Princess</option>
          <option value="CUSHION">Cushion</option>
          <option value="EMERALD">Emerald</option>
          <option value="ASSCHER">Asscher</option>
          <option value="RADIANT">Radiant</option>
          <option value="PEAR">Pear</option>
          <option value="OVAL">Oval</option>
          <option value="HEART">Heart</option>
          <option value="MARQUISE">Marquise</option>
        </select>
      </div>
    </div>
    </div>
   </>
  );

};

export default Header;
