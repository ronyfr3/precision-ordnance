import React from "react";
import classes from "./SearchScreen.module.css";

const SearchScreen = () => {
  return (
    <section className={classes.searchSection}>
      <div className={`${classes.searchWrapper} container`}>
        <h4>Search for products (e.g. optics, rifle components)</h4>
      </div>
    </section>
  );
};

export default SearchScreen;
