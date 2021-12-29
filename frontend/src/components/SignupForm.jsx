import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";
import { signup } from "../actions/userActions";

import classes from "./SignupForm.module.css";

const SignupForm = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warningPassword, setWarningPassword] = useState("");

  const dispatch = useDispatch();

  const userSignup = useSelector((state) => state.userSignup);
  const { error, success } = userSignup;

  useEffect(() => {
    if (success) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setWarningPassword("Password do not match");
    } else {
      dispatch(signup(name, email, password));
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {error && <Message message={error} color="#EF5350" />}
      {warningPassword && <Message message={warningPassword} color="#EF5350" />}
      {success && <Message message={success.message} color="#8BC34A" />}
      <h5>Getting Started</h5>
      <span>
        Sign up and get access to Red dots, scopes, lug actions for your next
        hunt.
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
      <label htmlFor="password">Confirm Password</label>
      <input
        type="password"
        placeholder=""
        id="confirmPassword"
        required
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button type="submit" className={`btn ${classes.signupBtn}`}>
        SIGN UP
      </button>
    </form>
  );
};

export default SignupForm;
