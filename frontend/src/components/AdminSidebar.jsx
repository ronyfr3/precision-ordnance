import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import classes from "./AdminSidebar.module.css";

const AdminSidebar = () => {
  return (
    <section className={classes.adminSidebarSection}>
      <div className={classes.topAdminSidebar}>
        <div className={classes.adminSidebarLogo}>
          <Link activeClassName={classes.active} to="/">
            <img src="/icons/po_logo.png" alt="" />
          </Link>
        </div>
        <ul>
          <li>
            <i className="fas fa-th-large"></i>
            <NavLink activeClassName={classes.active} to="/admin/dashboard">
              DASHBOARD
            </NavLink>
          </li>
          <li>
            <i className="fas fa-shopping-cart"></i>
            <NavLink activeClassName={classes.active} to="/admin/orderlist">
              ORDERS
            </NavLink>
          </li>
          <li>
            <i className="fas fa-shopping-bag"></i>
            <NavLink activeClassName={classes.active} to="/admin/productlist">
              PRODUCTS
            </NavLink>
          </li>
          <li>
            <i className="fas fa-cog"></i>
            <NavLink activeClassName={classes.active} to="/admin/settings">
              SETTINGS
            </NavLink>
          </li>
          <li>
            <i className="fas fa-image"></i>
            <NavLink activeClassName={classes.active} to="/admin/gallery">
              Gallery
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={classes.bottomAdminSidebar}>
        <div className={classes.bottomAdminSidebarWrapper}>
          <div className={classes.bottomAdminSidebarIcon}>
            <span>
              <i className="fas fa-user"></i>
            </span>
          </div>
          <div className={classes.bottomAdminName}>
            <h5>Emily Blunt</h5>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSidebar;
