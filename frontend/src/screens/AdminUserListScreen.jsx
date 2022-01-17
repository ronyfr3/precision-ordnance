import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Loader from "../components/Loader";
import ReactTable4 from "./ReactTable4";
import classes from "./AdminUserListScreen.module.css";

const AdminUserListScreen = ({ history }) => {
  const [spinner, setSpinner] = useState(true);
  // const { orders } = useSelector((state) => state.orderReducer)
  const { userInfo } = useSelector((state) => state.userSignin);

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
        <section className={classes.adminUserListSection}>
          <AdminSidebar />
          <div className={classes.adminUserListRight}>
            <AdminNavbar history={history} />
            <div className={classes.adminAllUserList}>
              <h4>ALL USER LIST</h4>
            </div>
            <ReactTable4 />
          </div>
        </section>
      )}
    </>
  );
};
export default AdminUserListScreen;
