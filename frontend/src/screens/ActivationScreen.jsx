import React, { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { activate } from "../actions/userActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import classes from "./ActivationScreen.module.css"

const ActivationScreen = ({ match, history }) => {
  const [spinner, setSpinner] = useState(true)

  const token = match.params.token
  const { name } = jwt.decode(token);

  const dispatch = useDispatch()

  let location = useLocation()

  const userActive = useSelector((state) => state.userActive)
  const { error } = userActive

  const activeHandler = () => {
    dispatch(activate(token))
    history.push("/")
  }

  useEffect(() => {
    localStorage.setItem("path", location.pathname)
    setTimeout(() => setSpinner(false), 500)
  }, [location.pathname])

  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.activationSection}>
          <div className={`${classes.activationWrapper} container`}>
            <div className={classes.activationContent}>
              {error && <Message error={error} />}
              <img src="/icons/po_logo.png" alt="Logo" />
              <div>
                <h2>Just one more step...</h2>
                <p className={classes.userName}>{name}</p>
                <button
                  onClick={activeHandler}
                  className={`${classes.activateBtn} btn`}
                >
                  Activate Account
                </button>
              </div>
              <p>Copyright @ All Rights Reserved</p>
              <p>Precison Ordnance 2021</p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ActivationScreen
