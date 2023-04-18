import React, { useContext, useEffect } from "react";

import axios from "axios";
import Header from "./Header";
import { MainContext } from "../context/MainContext";
import { Audio } from "react-loader-spinner";

import "./axiosdata.css";

function AxiosData() {
  const {
    token,
    setToken,
    data,
    setData,
    page,
    setPage,
    perPage,
    searchQuery,
    selectedShape,
    sortOption,isLoad, setIsLoad
  } = useContext(MainContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://hrcdiamonds.com/HRCProvideStock.svc/login",
          {
            params: {
              UserName: "dhruvadmc@gmail.com",
              Password: "123456",
            },
          }
        );
        setToken(response.data.loginResult.TOKEN);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.post(
            "https://thingproxy.freeboard.io/fetch/http://hrcdiamonds.com/HRCProvideStock.svc/GetStock",
            {
              mode: "no-cors",
              Token: token,
            }
          );

          setData(response.data.GetStockResult.DATA);
          setIsLoad(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [token]);

  // function to handle pagination
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // get the current page's data && Search Function
  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;

  const currentData = data
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .filter((item) => (selectedShape ? item.SHAPE === selectedShape : true))
    .sort((a, b) => {
      if (sortOption === "SHAPE") {
        return a.SHAPE.localeCompare(b.SHAPE);
      } else {
        return 0;
      }
    })

    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="head">
        <Header />
      </div>
      {isLoad ? (
        <div className="loader">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="three-dots-loading"
            wrapperStyle
            // wrapperClass
          />
        </div>
      ) : (
        <div className="table-responsive">
          {currentData ? (
            <table className="table">
              <thead>
                <tr>
                  <th>STONE NO</th>
                  <th>SHAPE</th>
                  <th>CARATS</th>
                  <th>COLOR</th>
                  <th>CLARITY</th>
                  <th>Cut</th>
                  <th>Polish</th>
                  <th>Symmetry</th>
                  <th>Measurements</th>
                  <th>Depth %</th>
                  <th>Table %</th>
                  <th>Fluorescence</th>
                  <th>Rap Price</th>
                  <th>Net Price</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.STONE_NO}</td>
                    <td>{item.SHAPE}</td>
                    <td>{item.CARATS}</td>
                    <td>{item.COLOR}</td>
                    <td>{item.CLARITY}</td>
                    <td>{item.CUT}</td>
                    <td>{item.POL}</td>
                    <td>{item.SYM}</td>
                    <td>{item.MEASUREMENTS}</td>
                    <td>{item.DEPTH_PER}</td>
                    <td>{item.TABLE_PER}</td>
                    <td>{item.FLUOR}</td>
                    <td>{item.RAP_PRICE}</td>
                    <td>{item.NET_PRICE}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
          {/* pagination buttons */}
          {data && data.length > 0 && (
            <div className="pagination">
              <button
                className="link link-two shrink-on-hover"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <button
                className="link link-two shrink-on-hover"
                onClick={() => handlePageChange(page + 1)}
                disabled={currentData.length < perPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AxiosData;
