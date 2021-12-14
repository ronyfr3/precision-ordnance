import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTable3 from "./ReactTable3";
import Message from "../components/Message";
import Footer from "../components/Footer";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

import classes from "./UserProfileScreen.module.css";
import Loader from "../components/Loader";

const UserProfileScreen = ({ history }) => {
  const [spinner, setSpinner] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/signin-signup");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }

    setTimeout(() => setSpinner(false), 500);
  }, [history, dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
    window.location.reload();
  };
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <>
          {/* <Header /> */}
          <section className={classes.userProfileSection}>
            <div className={`${classes.userProfileWrapper} container`}>
              <div className={classes.userProfileForm}>
                <h3>User Profile</h3>
                <form
                  onSubmit={submitHandler}
                  className={classes.userProfileForm}
                >
                  {error && <Message message={error} color="#EF5350" />}
                  {/* {success && <Message message={success.message} color="#8BC34A" />} */}
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
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder=""
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit" className={`btn ${classes.signupBtn}`}>
                    Update
                  </button>
                </form>
              </div>
              <div className={classes.userProfileOrder}>
                <h3>My Orders</h3>
                <ReactTable3 />
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default UserProfileScreen;
