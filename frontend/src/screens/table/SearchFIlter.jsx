import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import classes from "./SearchFilter.module.css";
const SearchFIlter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((x) => {
    setFilter(x || undefined);
  });
  return (
    <section className={classes.searchPrintPdf}>
      <div className={classes.search}>
        {/* <label htmlFor='search'>Search</label> */}
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
        <span>
          <i className="fas fa-search"></i>
        </span>
      </div>
      <div className={classes.printPdf}>
        {/* <div class="buttons-print"> */}
          {/* <button className={`btn ${classes.printBtn}`}>
            <i className="fas fa-print"></i> PRINT
          </button>
          <button className={`btn ${classes.downloadBtn}`}>
            <i className="fas fa-download"></i> DOWNLOAD PDF
          </button> */}
        {/* </div> */}
      </div>
    </section>
  );
};
export default SearchFIlter;
