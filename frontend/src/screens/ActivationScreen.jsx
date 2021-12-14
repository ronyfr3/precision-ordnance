import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import { activate } from "../actions/userActions";
import Message from "../components/Message";

import classes from "./ActivationScreen.module.css";

const ActivationScreen = ({ match, history }) => {
  const [spinner, setSpinner] = useState(true);

  const token = match.params.token;
  const { name } = jwt.decode(token);

  const dispatch = useDispatch();

  const userActive = useSelector((state) => state.userActive);
  const { error } = userActive;

  const activeHandler = () => {
    dispatch(activate(token));
    history.push("/");
  };

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);

  return (
    <>
      {spinner ? (
        <p>loader</p>
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
  );
};

export default ActivationScreen;
