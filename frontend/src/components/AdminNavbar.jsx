import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import classes from "./AdminNavbar.module.css";

const AdminNavbar = ({ history }) => {
  const [notification, setNotification] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();

  const handleNotification = () => {
    setNotification(!notification);
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/signin-signup");
  };

  const [notify, setNotify] = useState([]);

  useEffect(() => {
    axios.get("/api/notifi").then((res) => setNotify(res.data));
  }, []);

  return (
    <section className={classes.adminNavbarSection}>
      <div className={classes.adminSearch}>
        
      </div>
      <ul className={classes.adminNavbar}>
        <li>
          <div className={classes.adminNotification}>
            <i onClick={handleNotification} className="fas fa-bell"></i>
            <span></span>
            {notification ? (
              <div className={classes.notificationWrapper}>
                <div className={classes.notificationContent}>
                  <div className={classes.arrowUp}>
                    <i className="fas fa-sort-up"></i>
                  </div>
                  {/* <div className={classes.headNotificationContent}>
                    <h5>Mark all as read</h5>
                    <h5>Notification Settings</h5>
                  </div> */}
                  <ul className={classes.notificationList}>
                    {notify?.reverse()?.map((n, idx) => (
                      <li key={idx}>
                        <p>{n.message}</p>
                        <p>Product: {n.details.productName}</p>
                        <p>{moment(n.createdAt).fromNow()}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </li>
        <li className={classes.settings}>
          <Link to="/admin/settings">
            <i className="fas fa-cog"></i>
          </Link>
        </li>
        <li className={classes.adminNavbarProfile}>
          <span onClick={handleDropdown}>
            <i className="fas fa-user"></i>
          </span>
          {dropdown ? (
            <ul className={classes.adminNavbarDropdown}>
              <li>
                <Link to="/">Go to Website</Link>
              </li>
              <li>
                <Link to="/admin/settings">Profile settings</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          ) : (
            ""
          )}
        </li>
      </ul>
    </section>
  );
};

export default AdminNavbar;
