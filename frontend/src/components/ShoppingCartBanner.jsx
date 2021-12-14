import React from "react";
import { Link } from "react-router-dom";

import classes from "./ShoppingCartBanner.module.css";

const ShoppingCartBanner = () => {
  return (
    <section className={classes.shoppingCartBannerSection} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/images/shopping_cart_banner.png"})` }}>
      <div className={`${classes.shoppingCartBannerWrapper} container`}>
        <div className={classes.shoppingCartBannerContent}>
          <div>
            <h1>Shopping Cart</h1>
            <ul className={classes.breadcrumb}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">All Category</Link>
              </li>
              <li>
                <Link to="/">Product</Link>
              </li>
              <li>Shopping Cart</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCartBanner;
