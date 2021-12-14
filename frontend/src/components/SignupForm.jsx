import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";
import { signup } from "../actions/userActions";

import classes from "./SignupForm.module.css";

const SignupForm = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const dispatch = useDispatch();

  const userSignup = useSelector((state) => state.userSignup);
  const { error, success } = userSignup;

  useEffect(() => {
    if (success) {
      setName("");
      setEmail("");
      setPassword("");
      setAgree(false)
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signup(name, email, password));
  };

  console.log("error", error)

  return (
    <form onSubmit={submitHandler}>
      {error && <Message message={error} color="#EF5350" />}
      {success && <Message message={success.message} color="#8BC34A" />}
      <h5>Getting Started</h5>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, reiciendis.
      </span>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder=""
        id="name"
        name="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">E-mail address</label>
      <input
        type="email"
        placeholder=""
        name="email"
        required
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder=""
        id="password"
        required
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={classes.checkboxSignup}>
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <label htmlFor="" checked={agree} className={classes.agree}>
          I agree to the <span>Terms & Conditions</span>
        </label>
      </div>
      <button type="submit" className={`btn ${classes.signupBtn}`}>
        SIGN UP
      </button>
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

export default SignupForm;
