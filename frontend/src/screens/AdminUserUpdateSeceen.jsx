import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { updateUser } from "../actions/userActions";
import Loader from "../components/Loader";
import classes from "./AdminUserUpdateSeceen.module.css";
import axios from "axios";

const AdminUserUpdateScreen = ({ history, match }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [spinner, setSpinner] = useState(true);
  // const [singleUser, setSingleUser] = useState({});

  let location = useLocation();
  const dispatch = useDispatch();
  const id = match.params.id;

  const { userInfo } = useSelector((state) => state.userSignin);
  const { users } = useSelector((state) => state.userList);

  const singleUser = users?.find(user => user._id === id)
  console.log("user", singleUser, id);

  console.log(isAdmin);

  useEffect(async () => {
    if (!userInfo.isAdmin) {
      history.push("/signin-signup");
    } else {
      if (!singleUser?.name || singleUser?._id !== id) {
        // console.log("1");
        // const { data } = await axios.get(`/api/users/${id}`);
        // setSingleUser(data);
      } else {
        console.log("2");
        setName(singleUser?.name);
        setEmail(singleUser?.email);
        setIsAdmin(singleUser?.isAdmin);
      }
    }
    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }, [location, userInfo, history, singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(updateUser({ id: singleUser._id, name, email, isAdmin }));
    window.location.reload();
  };

  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.adminUserUpdateSection}>
          <AdminSidebar />
          <div className={classes.adminUserUpdateRight}>
            <AdminNavbar history={history} />
            <div className={classes.adminUserProfile}>
              <h4>Edit User</h4>
              <form
                onSubmit={handleSubmit}
                className={classes.adminUserProfileForm}
              >
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder=""
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">E-mail address</label>
                <input
                  type="email"
                  placeholder=""
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="checkbox"
                  id="admin"
                  name="admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />{" "}
                <span>Admin</span>
                <button type="submit" className={`btn ${classes.signupBtn}`}>
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminUserUpdateScreen;
