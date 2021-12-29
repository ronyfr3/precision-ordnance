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
      </div>
    </section>
  );
};
export default SearchFIlter;
