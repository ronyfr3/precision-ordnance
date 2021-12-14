import React from "react";
import { Link } from 'react-router-dom'

import classes from './Sidenav.module.css'

const Sidenav = () => {
  return (
    <>
      <div className={classes.sidenavTop}>
        <div className={classes.sidenavLogo}>
          <img src="/images/Logo.png" alt="" />
        </div>
        <ul>
          <li>
            <i className="fas fa-th-large"></i>
            <Link to="/">DASHBOARD</Link>
          </li>
          <li>
            <i className="fas fa-shopping-cart"></i>
            <Link to="/">ORDERS</Link>
          </li>
          <li>
            <i className="fas fa-shopping-bag"></i>
            <Link to="/">PRODUCTS</Link>
          </li>
          <li>
            <i className="fas fa-cog"></i>
            <Link to="/">SETTINGS</Link>
          </li>
        </ul>
      </div>
      <div className={classes.sidenavBottom}>
        <div className={classes.sidenavBottomWrapper}>
          <div className={classes.sidenavImage}>
            <img src="/images/testimonial.jpg" alt="" />
          </div>
          <div className={classes.adminNameBottom}>
            <h5>Emily Blunt</h5>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
