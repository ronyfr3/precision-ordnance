import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTable3 from "./ReactTable3";
import Message from "../components/Message";
import Footer from "../components/Footer";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import classes from "./UserProfileScreen.module.css";

const UserProfileScreen = ({ history }) => {
  const [show, setShow] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState("")

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
        dispatch(listMyOrders());
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }

    setTimeout(() => setSpinner(false), 500);
  }, [history, dispatch, userInfo, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setWarningMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      window.location.reload();
    }
  };

  const handleEmptyForm = (e) => {
    e.preventDefault();
  };

  const modal = (
    <div className={classes.modalSection}>
      <div className={classes.modalWrapper}>
        <div className={classes.contactUsForm}>
          <div className={classes.accountProfile}>
            {warningMessage && (
              <Message message={warningMessage} color="#EF5350" />
            )}
            <h5>EDIT PROFILE</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes.noDoubleInput}>
              <div className={classes.inputLeft}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.noDoubleInput}>
              <div className={classes.inputLeft}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.noDoubleInput}>
              <div className={classes.inputRight}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="******"
                  id="password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.noDoubleInput}>
              <div className={classes.inputRight}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  placeholder="******"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.accountButtons}>
              <button className={`btn ${classes.saveBtn}`}>Save Profile</button>
            </div>
          </form>
          <span onClick={() => setShow(!show)} className={classes.times}>
            <i className="far fa-times-circle"></i>
          </span>
        </div>
      </div>
    </div>
  );

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
                  onSubmit={handleEmptyForm}
                  className={classes.userProfileForm}
                >
                  {/* {error && <Message message={error} color="#EF5350" />} */}
                  {/* {success && <Message message={success.message} color="#8BC34A" />} */}
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder=""
                    id="name"
                    name="name"
                    value={name}
                    // onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="email">E-mail address</label>
                  <input
                    type="email"
                    placeholder=""
                    name="email"
                    id="email"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="******"
                    id="password"
                    name="password"
                    value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={() => setShow(!show)}
                    className={`btn ${classes.signupBtn}`}
                  >
                    Edit Profile
                  </button>
                </form>
              </div>
              <div className={classes.userProfileOrder}>
                <h3>My Orders</h3>
                <ReactTable3 />
              </div>
            </div>
            {show ? modal : ""}
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default UserProfileScreen;
