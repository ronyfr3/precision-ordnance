import React from "react";
import { Link } from "react-router-dom";

import classes from "./CheckoutBanner.module.css";

const CheckoutBanner = () => {
  return (
    <section
      className={classes.checkoutBannerSection}
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/images/shopping_cart_banner.png"
        })`,
      }}
    >
      <div className={`${classes.checkoutBannerWrapper} container`}>
        <div className={classes.checkoutBannerContent}>
          <div>
            <h1>Checkout</h1>
            <ul className={classes.breadcrumb}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Category Name</Link>
              </li>
              <li>
                <Link to="/">Product</Link>
              </li>
              <li>Checkout</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutBanner;
