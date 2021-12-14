import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Message from './Message'
import { signin } from "../actions/userActions"

import classes from "./SigninForm.module.css"

const SigninForm = ({ history }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const userSignin = useSelector((state) => state.userSignin)
  const { error, userInfo } = userSignin

  useEffect(() => {
    // if (!userInfo.isAdmin) {
    //   history.push('/')
    // }
    // if (userInfo.isAdmin) {
    //   history.push('/admin/dashboard')
    // }
    if (userInfo) {
      if (userInfo.isAdmin) {
        history.push('/admin/dashboard')
      } else {
        history.push('/')
      }
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }
console.log(error);
  return (
    <form onSubmit={submitHandler}>
      {error && <Message message={error} color="#EF5350" />}
      <h5>Welcome Back!</h5>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, reiciendis.
      </span>
      <label htmlFor="email">
        E-mail address
        
      </label>
      <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
        />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=""
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
  )
}

export default SigninForm
