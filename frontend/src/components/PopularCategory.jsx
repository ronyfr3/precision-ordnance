import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./PopularCategory.module.css";

const PopularCategory = () => {
  const { products } = useSelector((state) => state.productsReducer);
  console.log(products);

  function onlyUnique(value, index, self) {
    return self?.indexOf(value) === index;
  }
  const uniqueArray = products
    ?.map((x) => x?.category?.toLowerCase()?.trim())
    ?.filter(onlyUnique);

  return (
    <section className={classes.popularCategorySection}>
      {/* <similarProduct category={category} /> */}
      <div className={`${classes.popularCategoryWrapper} container`}>
        <h3>Featured Products</h3>
        <p>
        Explore the most featured gears perfect for your hunting experience.
        </p>
        <div className={classes.popularCategoryContent}>
          {uniqueArray?.map((unique) => (
            <div key={unique}>
              <Link  to={`/category/${unique}`}>
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
