import React, { createContext, useState } from "react";

const MainContext = createContext();

function MainStateProvider({ children }) {
  
    const [token, setToken] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1); // current page number
    const [perPage, setPerPage] = useState(10); // number of items per page
    const [search, setSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedShape, setSelectedShape] = useState("");
    const [sortOption, setSortOpetion] = useState("")
    const [isLoad, setIsLoad] = useState(true);
   

  return (
    <MainContext.Provider
      value={{
        token, setToken,data, setData,page, setPage,perPage, setPerPage,search,setSearch,filteredData, setFilteredData
     ,sortOption, setSortOpetion,searchQuery, setSearchQuery,selectedShape, setSelectedShape,isLoad, setIsLoad }}
    >
      {children}
    </MainContext.Provider>
  );
}
export { MainContext, MainStateProvider };