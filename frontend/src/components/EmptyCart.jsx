import React from "react";
import { Link } from "react-router-dom";
import classes from "./EmptyCart.module.css";

const EmptyCart = () => {
  return (
    <section className={classes.emptyCartSection}>
      <div className={`${classes.emptyCartWrapper} container`}>
        <div className={classes.emptyCartDetails}>
          <h3>Cart is empty</h3>
          <Link to="/all-products">Go to shop</Link>
        </div>
      </div>
    </section>
  );
};

export default EmptyCart;
