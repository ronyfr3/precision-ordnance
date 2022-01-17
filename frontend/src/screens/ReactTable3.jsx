import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { COLUMNS } from "./table/Columns3";
// import SearchFilter from "./table/SearchFIlter";
import classes from './ReactTable2.module.css'

const ReactTable3 = () => {
  const { userInfo } = useSelector((state) => state.userSignin);
  // const { orders } = useSelector((state) => state.orderListMy);
  const [falsyOrder,setFalsyOrder] = useState([])

  console.log("falsyOrder", falsyOrder)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .get("/api/orders/myorders", config)
      .then((res) => setFalsyOrder(res.data))
      .then((err) => console.log(err));
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => falsyOrder, [falsyOrder]);
  //creating table instance
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  //Destructuring properties and methods from tableInstance
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state,
    pageOptions,
    gotoPage,
    // pageCount,
    setPageSize,
    // setGlobalFilter,
  } = tableInstance;
  const { pageIndex, pageSize } = state;
  // const { globalFilter } = state;

  return (
    <>
      <table className={classes.orderListTable} {...getTableProps()}>
        <thead>
          {headerGroups.map((x, idx) => (
            <tr key={idx} {...x.getHeaderGroupProps()}>
              {x.headers.map((column, idx) => (
                <th key={idx} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className="downarrow">&or;</span>
                      ) : (
                        <span className="uparrow">&and;</span>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((x, idx) => {
            prepareRow(x);
            return (
              <tr key={idx} {...x.getRowProps()}>
                {x.cells.map((cell, idx) => {
                  return (
                    <td key={idx}
                      {...cell.getCellProps()}
                      data-label={cell?.column?.Header}
                    >
                      <Link to={`/user-orders/${x?.original?._id}`}>
                        {cell.render("Cell")}
                      </Link>
                    </td>
                  );
                })}
                {/* <td onClick={() => handleUpdate(x.original._id)}>
                <button className={classes.updateBtn}>
                    <i className="fas fa-pen-alt"></i>
                  </button>
                </td> */}
                {/* <td onClick={() => handleDelete(x.original._id)}>
                <button className={classes.deleteBtn}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes.orderListPagination}>
        {/* show data in per page */}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[25, 50, 75, 100, 125, 150, 200].map((x) => (
            <option key={x} value={x}>
              show {x}
            </option>
          ))}
        </select>
        <span className={classes.showingPage}>
          showing page <b>{pageIndex + 1}</b> of {pageOptions.length}
        </span>
        <div>
        <button className={classes.prevBtn} onClick={() => previousPage()} disabled={!canPreviousPage}>
          <i className="fas fa-chevron-left"></i>
          </button>
        <span>
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              gotoPage(e.target.value ? Number(e.target.value) - 1 : 0);
            }}
          />
          <b>
            {pageIndex + 1}/{pageOptions.length}
          </b>
        </span>
        <button className={classes.nextBtn} onClick={() => nextPage()} disabled={!canNextPage}>
          <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ReactTable3;
