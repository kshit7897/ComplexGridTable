import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Header from "./Header";
import { MainContext } from "../context/MainContext";
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import "./demodata.css";

import MuiPagination from "@mui/material/Pagination";

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

Pagination.propTypes = {
  className: PropTypes.string,
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: PropTypes.func.isRequired,
  /**
   * The zero-based index of the current page.
   */
  page: PropTypes.number.isRequired,
};

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function DemoData() {
  const { token, setToken, data, setData, searchQuery, isLoad, setIsLoad } =
    useContext(MainContext);

  const [rowCount, setRowCount] = useState(0);

  const getRowId = (row) => row.STONE_NO;

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
          setRowCount(response.data.GetStockResult.ROW_COUNT);
          setIsLoad(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [token]);

  const currentData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
  ];

  return (
    <>
      <Header />
      <Box className="table">
        <DataGrid
          getRowId={getRowId}
          rows={currentData}
          columns={columns}
          loading={isLoad}
          disableSelectionOnClick
          density="compact"
          pagination
          slots={{
            pagination: CustomPagination,
          }}
          pageSize={25}
        />
      </Box>
    </>
  );
}

export default DemoData;
