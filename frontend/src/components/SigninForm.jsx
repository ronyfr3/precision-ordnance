import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import Message from "./Message";
import { signin, googleSignin } from "../actions/userActions";

import classes from "./SigninForm.module.css";


const SigninForm = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { error, userInfo } = userSignin;

  useEffect(() => {
    // if (!userInfo.isAdmin) {
    //   history.push('/')
    // }
    // if (userInfo.isAdmin) {
    //   history.push('/admin/dashboard')
    // }
    if (userInfo) {
      if (userInfo.isAdmin) {
        history.push("/admin/dashboard");
      } else {
        history.push("/");
      }
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const responseGoogle = (res) => {
    const { tokenId } = res
    console.log(tokenId)
    dispatch(googleSignin(tokenId))
  }

  return (
    <form onSubmit={submitHandler}>
      {error && <Message message={error} color="#EF5350" />}
      <h5>Welcome Back!</h5>
      <span>Sign in and save your carts with accessories you need.</span>
      <label htmlFor="email">E-mail address</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=""
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=""
        required
      />
      {/* <div className={classes.checkboxSignup}>
        <input type="checkbox" />
        <label htmlFor="" className={classes.agree}>
          Remember me
        </label>
      </div> */}
      <button type="submit" className={`btn ${classes.signupBtn}`}>
        Sign In
      </button>
      <div className={classes.socialSignin}>
        <GoogleLogin
          clientId="779648521547-gjlsus2l9aud4kosqdtc5gu5icmumqlp.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          // onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="1088597931155576"
          // autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          // callback={responseFacebook}
        />
      </div>

      {/* <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email,picture"
        // callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      /> */}
      {/* <div className={classes.socialContainer}>
        <ul>
          <li>or sign up with</li>
          <li>
            <Link to="/">Facebook</Link>
          </li>
          <li>
            <Link to="/">Google</Link>
          </li>
          <li>
            <Link to="/">Linkdin</Link>
          </li>
        </ul>
      </div> */}
    </form>
  );
};

export default SigninForm;
