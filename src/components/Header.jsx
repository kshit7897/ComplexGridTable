import React, { useContext } from "react";

import { MainContext } from "../context/MainContext";

import "./header.css";


const Header = () => {
  
const {setSearchQuery,searchQuery} = useContext(MainContext);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


  return (
    <>
    <div className="head-bg">
    <div className="main-div">
      <input
        className="search-bar"
        type="text"
        placeholder="Search here"
        value={searchQuery}
        onChange={handleSearch}
      />
      </div>
    </div>
   </>
  );

};

export default Header;
