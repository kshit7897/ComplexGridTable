import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { MainContext } from "../context/MainContext";
import { Audio } from "react-loader-spinner";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import "./demodata.css";

function DemoData() {
  const {
    token,
    setToken,
    data,
    setData,
    searchQuery,
    isLoad,
    setIsLoad,
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

  const currentData = data
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )

  const columns = [
    { field: "STONE_NO", headerName: "STONE NO", flex: 1 },
    { field: "SHAPE", headerName: "SHAPE", flex: 1 },
    { field: "CARATS", headerName: "CARATS", flex: 1 },
    { field: "COLOR", headerName: "COLOR", flex: 1 },
    { field: "CLARITY", headerName: "CLARITY", flex: 1 },
    { field: "CUT", headerName: "Cut", flex: 1 },
    { field: "POL", headerName: "Polish", flex: 1 },
    { field: "SYM", headerName: "Symmetry", flex: 1 },
    { field: "MEASUREMENTS", headerName: "Measurements", flex: 1 },
    { field: "PRICE", headerName: "Price", flex: 1 },
    { field: "SELLER", headerName: "Seller", flex: 1 },
    { field: "LOCATION", headerName: "Location", flex: 1 },
  ];

  const getRowId = (row) => row.STONE_NO;

  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex justify-content-center">
          {isLoad ? (
            <div className="loader">
              <Audio
                height="80"
                width="80"
                radius="9"
                color="blue"
                ariaLabel="three-dots-loading"
                // wrapperClass
              />
            </div>
          ) : (
            <div className="table">
              <DataGrid
                checkboxSelection
                rows={currentData}
                columns={columns}
                rowCount={data.length}
                pagination
                disableSelectionOnClick
                getRowId={getRowId}
                slots={{
                  toolbar: GridToolbar,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DemoData;
