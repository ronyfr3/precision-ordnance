import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./StayInTouch.module.css";

const StayInTouch = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/subscribe", { email })
      .then((response) => toast(response.data.message))
      .catch((error) => toast(error.response.data.message));
    setEmail("");
  };
  return (
    <section className={classes.stayInTouchSection}>
      <div className={`${classes.stayInTouchWrapper} container`}>
        <div className={classes.stayInTouchContent}>
          <h4>Stay in touch</h4>
          <p>Subscribe for news on the latest components, specials and information</p>
          <form className={classes.stayInTouchForm}>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
            />
            <button onClick={handleSubscribe}>Subscribe</button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </section>
  );
};

export default StayInTouch;
