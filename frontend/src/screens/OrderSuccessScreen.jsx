import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import classes from "./OrderSuccessScreen.module.css";

const OrderSuccessScreen = () => {
  const [spinner, setSpinner] = useState(true);

  const location = useLocation(true);

  useEffect(() => {
    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }, [location.pathname]);
  return (
    <>
      {spinner ? (
        <Loader />
      ) : ( 
        <section className={classes.orderSuccessSection}>
          <div className={`${classes.orderSuccessWrapper} container`}>
            <div className={classes.orderSuccessContent}>
              <div>
                <img src="/icons/success_logo.png" alt="" />
                <p>
                  Your order has been received. We will contact you soon to
                  confirm the order. Thank you so much for your generosity, have
                  a great day.
                </p>
                <a href="/" className={classes.orderBtn}>
                  <i className="fas fa-arrow-left"></i> Back to Website
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderSuccessScreen;
