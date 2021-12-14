import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./PopularCategory.module.css";

const PopularCategory = () => {
  const { products } = useSelector((state) => state.productsReducer);
  console.log(products);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const uniqueArray = products
    ?.map((x) => x?.category?.toLowerCase()?.trim())
    ?.filter(onlyUnique);

    console.log('unique', uniqueArray)

  return (
    <section className={classes.popularCategorySection}>
      {/* <similarProduct category={category} /> */}
      <div className={`${classes.popularCategoryWrapper} container`}>
        <h3>People’s Favourite</h3>
        <p>
        Explore the gears that people have shared their hunting experience with, the ones that are people’s favourite.
        </p>
        <div className={classes.popularCategoryContent}>
          {uniqueArray?.map((unique) => (
            <div>
              <Link key={unique} to={`/category/${unique}`}>
                <h4>{unique}</h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;
