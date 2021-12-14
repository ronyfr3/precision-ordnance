import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import ReactTable2 from "./ReactTable2";
import classes from "./AdminOrderlistScreen.module.css";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const AdminOrderlistScreen = ({ history }) => {
  const [spinner, setSpinner] = useState(true);
  // const { orders } = useSelector((state) => state.orderReducer)
  const { userInfo } = useSelector((state) => state.userSignin)
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
        <section className={classes.adminOrderListSection}>
          <AdminSidebar />
          <div className={classes.adminOrderListRight}>
            <AdminNavbar history={history} />
            <div className={classes.adminAllOrderList}>
              <h4>ALL ORDER LIST</h4>
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
            <ReactTable2 />
          </div>
        </section>
      )}
    </>
  );
};
export default AdminOrderlistScreen;
