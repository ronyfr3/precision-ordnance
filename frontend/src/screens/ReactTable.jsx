import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import classes from './ReactTable.module.css';
import { COLUMNS } from './table/Columns';
import SearchFilter from './table/SearchFIlter';

const ReactTable = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get('/api/products')
      .then((res) => setProducts(res.data))
      .then((err) => console.log(err));
  }, []);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => products, [products]);
  //creating table instance
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
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
    pageCount,
    setPageSize,
    setGlobalFilter,
  } = tableInstance;
  const { pageIndex, pageSize } = state;
  const { globalFilter } = state;

  const history = useHistory();
  const handleUpdate = (id) => {
    history.push(`/admin/productupdate/${id}`);
  };

  //delete msg
  const [msg, setMsg] = useState('');
  const handleDelete = (id) => {
    alert('do you want to delete?');
    axios
      .delete(`/api/products/${id}`)
      .then((res) => setMsg(res.data))
      .then((err) => console.log(err));
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  };

  return (
    <>
      <SearchFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table className={classes.productListTable} {...getTableProps()}>
        <thead>
          {headerGroups.map((x) => (
            <tr {...x.getHeaderGroupProps()}>
              {x.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className='downarrow'>&or;</span>
                      ) : (
                        <span className='uparrow'>&and;</span>
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((x) => {
            console.log('x', x);
            prepareRow(x);
            return (
              <tr {...x.getRowProps()}>
                {x.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      data-label={cell?.column?.Header}
                    >
                      <Link to={`/admin/productlist/${x.original._id}`}>
                        {cell.render('Cell')}
                      </Link>
                    </td>
                  );
                })}
                <td onClick={() => handleUpdate(x.original._id)}>
                  <button className={classes.updateBtn}>
                    <i class='fas fa-pen-alt'></i>
                  </button>
                </td>
                <td onClick={() => handleDelete(x.original._id)}>
                  <button className={classes.deleteBtn}>
                    <i class='fas fa-trash-alt'></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes.productListPagination}>
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
          <button
            className={classes.prevBtn}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <i class='fas fa-chevron-left'></i>
          </button>
          <span>
            <input
              type='number'
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                gotoPage(e.target.value ? Number(e.target.value) - 1 : 0);
              }}
            />
            <b>
              {pageIndex + 1}/{pageOptions.length}
            </b>
          </span>
          <button
            className={classes.nextBtn}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <i class='fas fa-chevron-right'></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ReactTable;
