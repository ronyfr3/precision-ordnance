import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import classes from "./AdminSettingsScreen.module.css";

const AdminSettingsScreen = ({ history }) => {
  const [spinner, setSpinner] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  let location = useLocation();

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
    localStorage.setItem("path", location.pathname);
  }, [history, dispatch, userInfo, user, location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
    window.location.reload();
  };

  const data = [
    {
      id: "1",
      tabTitle: (
        <p className={classes.tabItem}>
          <i className="far fa-user"></i> <span>ACCOUNT</span>
        </p>
      ),
      tabContent: (
        <div className={classes.accountSection}>
          <div className={classes.accountProfile}>
            <h5>EDIT PROFILE</h5>
            <div className={classes.profileImage}>
              <span>
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes.doubleInput}>
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
            <div className={classes.doubleInput}>
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
            <div className={classes.doubleInput}>
              <div className={classes.inputRight}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="******"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.accountButtons}>
              <button className={`btn ${classes.saveBtn}`}>SAVE CHANGES</button>
            </div>
          </form>
        </div>
      ),
    },
    // {
    //   id: "2",
    //   tabTitle: (
    //     <li className={classes.tabItem}>
    //       {/* <Link to="/"> */}
    //       <i className="far fa-bell"></i> <span>NOTIFICATION</span>
    //       {/* </Link> */}
    //     </li>
    //   ),
    //   tabContent: (
    //     <div className={classes.notificationSection}>
    //       <div className={classes.notificationDetails}>
    //         <h5>EDIT PROFILE</h5>
    //       </div>
    //       <div className={classes.notificationFiles}>
    //         <div className={classes.noti}>
    //           <div className={classes.notiLeft}>
    //             <h6>Order Alert</h6>
    //             <p>
    //               Send me a copy of order email to my personal email address
    //             </p>
    //           </div>
    //           <div className={classes.notiRight}>
    //             <label className={classes.switch}>
    //               <input type="checkbox" checked />
    //               <span className={`${classes.slider} ${classes.round}`}></span>
    //             </label>
    //           </div>
    //         </div>
    //         <div className={classes.noti}>
    //           <div className={classes.notiLeft}>
    //             <h6>Order Alert</h6>
    //             <p>
    //               Send me a copy of order email to my personal email address
    //             </p>
    //           </div>
    //           <div className={classes.notiRight}>
    //             <label className={classes.switch}>
    //               <input type="checkbox" />
    //               <span className={`${classes.slider} ${classes.round}`}></span>
    //             </label>
    //           </div>
    //         </div>
    //         <div className={classes.noti}>
    //           <div className={classes.notiLeft}>
    //             <h6>Order Alert</h6>
    //             <p>
    //               Send me a copy of order email to my personal email address
    //             </p>
    //           </div>
    //           <div className={classes.notiRight}>
    //             <label className={classes.switch}>
    //               <input type="checkbox" checked />
    //               <span className={`${classes.slider} ${classes.round}`}></span>
    //             </label>
    //           </div>
    //         </div>
    //         <div className={classes.noti}>
    //           <div className={classes.notiLeft}>
    //             <h6>Order Alert</h6>
    //             <p>
    //               Send me a copy of order email to my personal email address
    //             </p>
    //           </div>
    //           <div className={classes.notiRight}>
    //             <label className={classes.switch}>
    //               <input type="checkbox" />
    //               <span class={`${classes.slider} ${classes.round}`}></span>
    //             </label>
    //           </div>
    //         </div>
    //         <div className={classes.noti}>
    //           <div className={classes.notiLeft}>
    //             <h6>Order Alert</h6>
    //             <p>
    //               Send me a copy of order email to my personal email address
    //             </p>
    //           </div>
    //           <div className={classes.notiRight}>
    //             <label className={classes.switch}>
    //               <input type="checkbox" checked />
    //               <span className={`${classes.slider} ${classes.round}`}></span>
    //             </label>
    //           </div>
    //         </div>
    //         <div className={classes.noti}>
    //           <div className={classes.notiLeft}>
    //             <h6>Order Alert</h6>
    //             <p>
    //               Send me a copy of order email to my personal email address
    //             </p>
    //           </div>
    //           <div className={classes.notiRight}>
    //             <label className={classes.switch}>
    //               <input type="checkbox" checked />
    //               <span className={`${classes.slider} ${classes.round}`}></span>
    //             </label>
    //           </div>
    //         </div>
    //       </div>
    //       <div className={classes.notificationButtons}>
    //         <button className={`btn ${classes.saveBtn}`}>SAVE CHANGES</button>
    //         <button className={`btn ${classes.cancelBtn}`}>CANCEL</button>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      id: "3",
      tabTitle: (
        <p className={classes.tabItem}>
          {/* <Link to="/"> */}
          <i className="fas fa-shield-alt"></i> <span>SECURITY</span>
          {/* </Link> */}
        </p>
      ),
      tabContent: (
        <div className={classes.securitySection}>
          <div className={classes.securityDetails}>
            <h5>PASSWORD SETTINGS</h5>
          </div>
          <form>
            <div className={classes.emailField}>
              <label htmlFor="">Email address</label>
              <input type="email" name="" id="" placeholder="emily@gmail.com" />
            </div>
            <div className={classes.changePassword}>
              <div className="">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="***************"
                />
              </div>
              <div className="">
                <Link to="/">Change password</Link>
              </div>
            </div>
            <div className={classes.noti}>
              <div className={classes.notiLeft}>
                <h6>Security Alert</h6>
                <p>Notify me if someone want to login in my account</p>
              </div>
              <div className={classes.notiRight}>
                <label className={classes.switch}>
                  <input type="checkbox" checked />
                  <span className={`${classes.slider} ${classes.round}`}></span>
                </label>
              </div>
            </div>
            <div className={classes.securityButtons}>
              <button className={`${classes.saveBtn}`}>SAVE CHANGES</button>
              <button className={`${classes.cancelBtn}`}>CANCEL</button>
            </div>
          </form>
        </div>
      ),
    },
  ];

  const [visibleTab, setVisibleTab] = React.useState(data[0].id);

  const listTitles = data?.map((item) => (
    <li
      onClick={() => setVisibleTab(item.id)}
      key={item.id}
      className={
        visibleTab === item.id ? "tab-title tab-title--active" : "tab-title"
      }
    >
      {item.tabTitle}
    </li>
  ));

  const listContent = data.map((item) => (
    <p key={item.id} style={visibleTab === item.id ? {} : { display: "none" }}>
      {item.tabContent}
    </p>
  ));
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.settingsSection}>
          <AdminSidebar />
          <div className={classes.settingsWrapper}>
            <AdminNavbar history={history} />
            <div className={classes.settingsDetails}>
              <div className="">
                <h4>SETTINGS</h4>
              </div>
            </div>
            <div className={classes.settingsDetailsProfile}>
              <div className={classes.settingsDetailsWrapper}>
                <ul className={classes.settingsDetailsLeft}>{listTitles}</ul>
                <div className={classes.settingsDetailsRight}>
                  {listContent}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminSettingsScreen;
