import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Loader from "../components/Loader";
import classes from "./AdminOrderlistScreen.module.css";
import ReactTable2 from "./ReactTable2";

const AdminOrderlistScreen = ({ history }) => {
  const [spinner, setSpinner] = useState(true);
  // const { orders } = useSelector((state) => state.orderReducer)
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  let location = useLocation();

  if (!userInfo || !userInfo.isAdmin) {
    history.push("/");
  } else {
    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }
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
            </div>
            <ReactTable2 />
          </div>
        </section>
      )}
    </>
  );
};
export default AdminOrderlistScreen;
