import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import Loader from "../components/Loader";

import classes from "./SigninSignupScreen.module.css";

const SigninSignupScreen = ({ history }) => {
  const [activeClass, setActiveClass] = useState("");
  const [showOne, setShowOne] = useState(true)
  const [showTwo, setShowTwo] = useState(false)
  const [spinner, setSpinner] = useState(true)

  const location = useLocation();
  const handleSignup = () => {
    setActiveClass(classes.rightPanelActive);
    setShowTwo(true)
    setShowOne(true)
  };

  const handleSignin = () => {
    setActiveClass("");
    setShowOne(true)
    setShowTwo(true)
  };

  const handleSigninSignupOne = () => {
    setShowOne(!showOne)
    setShowTwo(true)
  }

  const handleSigninSignupTwo = () => {
    setShowOne(true)
    setShowTwo(!showTwo)
  }

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
            style={{ display: showTwo ? 'block' : 'none' }}
              className={`${classes.formContainer} ${classes.signUpContainer}`}
            >
              <Link to="/" className={`${classes.backBtn} ${classes.backBtn2} ${classes.hide}`}><i className="fas fa-long-arrow-alt-left"></i> Back</Link>
              <SignupForm history={history} />
              <div className={classes.newCustomer}> <span>Have an Account?</span> <button onClick={handleSigninSignupTwo}>Login</button></div>
            </div>
            <div
            style={{ display: showOne ? 'block' : 'none' }}
              className={`${classes.formContainer} ${classes.signInContainer}`}
            >
              <Link to="/" className={`${classes.backBtn} ${classes.backBtn2}`}><i className="fas fa-long-arrow-alt-left"></i> Back</Link>
              <SigninForm history={history} />
              <div className={classes.newCustomer}><span>New customer?</span> <button onClick={handleSigninSignupOne}>Sign up</button></div>
              {/* <h1 style={{position: 'relative', zIndex: '10000', color: 'red'}}>hello workd</h1> */}

            </div>
            <div className={classes.overlayContainer}>
              <div className={classes.overlaySignup}>
                <div
                  className={`${classes.overlayPanel}  ${classes.overlayLeft}`}
                  style={{
                    backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.7), rgb(0, 0, 0, 0.7)), url(${
                      process.env.PUBLIC_URL + "/images/signin-signup.jpg"
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
                      Sign in
                    </button>
                  </div>
                </div>
                <div
                  className={`${classes.overlayPanel} ${classes.overlayRight}`}
                  style={{
                    backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.7), rgb(0, 0, 0, 0.7)), url(${
                      process.env.PUBLIC_URL + "/images/signin-signup.jpg"
                    })`,
                  }}
                >
                  <div className={classes.marginSignup}>
                    <img src="/images/Logo.png" alt="" />
                    <h5>Gear up!</h5>
                    <p>
                    Sign up and explore the top-featured gears at Precision Ordnance.
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
