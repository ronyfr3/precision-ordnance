import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { Link, useLocation } from "react-router-dom";
import ReactTable from "./ReactTable";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import classes from "./AdminProductlistScreen.module.css";
import Loader from "../components/Loader";

const AdminProductlist = ({ history }) => {
  const [spinner, setSpinner] = useState(true);
  const  {userInfo}  = useSelector((state) => state.userSignin)
  let location = useLocation();
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/")
    }
    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }, [location, history]);
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.adminProductListSection}>
          <AdminSidebar />
          <div className={classes.adminProductListRight}>
            <AdminNavbar history={history} />
            <div className={classes.adminAllProductList}>
              <div>
                <h4>ALL PRODUCT LIST</h4>
                {/* <ul class="product-divisions">
          <li>
            <Link to="/">ALL</Link>
          </li>
          <li>
            <Link to="/">IN STOCK</Link>
          </li>
          <li>
            <Link to="/">OUT OF STOCK</Link>
          </li>
        </ul> */}
              </div>
              <Link
                to="/admin/productcreate"
                className={`btn ${classes.addBtn}`}
              >
                + Add New
              </Link>
            </div>
            <ReactTable />
          </div>
        </section>
      )}
    </>
  );
};
export default AdminProductlist;
