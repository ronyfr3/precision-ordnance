import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import Loader from "../components/Loader";

import classes from "./SigninSignupScreen.module.css";

const SigninSignupScreen = ({ history }) => {
  const [activeClass, setActiveClass] = useState("");
  const [spinner, setSpinner] = useState(true);

  const location = useLocation();
  const handleSignup = () => {
    setActiveClass(classes.rightPanelActive);
  };

  const handleSignin = () => {
    setActiveClass("");
  };

  useEffect(() => {
    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }, [location.pathname]);

  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.backgroundSignup}>
          <div
            className={`${activeClass} ${classes.container}`}
            id="containerr"
          >
            <div
              className={`${classes.formContainer} ${classes.signUpContainer}`}
            >
              <SignupForm history={history} />
            </div>
            <div
              className={`${classes.formContainer} ${classes.signInContainer}`}
            >
              <Link to="/" className={`${classes.backBtn} ${classes.backBtn2}`}><i className="fas fa-long-arrow-alt-left"></i> Back</Link>
              <SigninForm history={history} />
            </div>
            <div className={classes.overlayContainer}>
              <div className={classes.overlaySignup}>
                <div
                  className={`${classes.overlayPanel}  ${classes.overlayLeft}`}
                  style={{
                    backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${
                      process.env.PUBLIC_URL + "/images/sign-up.png"
                    })`,
                  }}
                >
                  <Link to="/" className={classes.backBtn}><i className="fas fa-long-arrow-alt-left"></i> Back</Link>
                  <div className={classes.marginSignup}>
                    <img src="/images/Logo.png" alt="" />
                    <h5>Already have an account?</h5>
                    <p>
                      Get access to latest scopes, lug actions and custom-built
                      rifles, super fast.
                    </p>
                    <button
                      onClick={handleSignin}
                      className={`${classes.ghost} btn`}
                      id="signIn"
                    >
                      Signin
                    </button>
                  </div>
                </div>
                <div
                  className={`${classes.overlayPanel} ${classes.overlayRight}`}
                  style={{
                    backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${
                      process.env.PUBLIC_URL + "/images/sign-up.png"
                    })`,
                  }}
                >
                  <div className={classes.marginSignup}>
                    <img src="/images/Logo.png" alt="" />
                    <h5>Gear up!</h5>
                    <p>
                      Register and save your carts with neat and ultra-light
                      gears for your next hunt.
                    </p>
                    <button
                      onClick={handleSignup}
                      className={`${classes.ghost} btn`}
                      id="signUp"
                    >
                      CREATE ACCOUNT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SigninSignupScreen;
