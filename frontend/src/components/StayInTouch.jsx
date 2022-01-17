import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import classes from "./StayInTouch.module.css";

const StayInTouch = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      await axios
        .post("/api/subscribe", { email })
        .then((response) => setMessage(response.data.message))
        .catch((error) => setMessage(error.response.data.message));
      setTimeout(() => {
        setEmail("");
        setMessage("")
      }, 2000);
    }
  };
  return (
    <section className={classes.stayInTouchSection}>
      <div className={`${classes.stayInTouchWrapper} container`}>
        <div className={classes.stayInTouchContent}>
          <h4>Stay in touch</h4>
          <p>
            Subscribe for news on the latest components, specials and
            information
          </p>
          {message && <p className={classes.feedbackMessage}><i className="fas fa-check-circle"></i> {message}</p>}
          <form className={classes.stayInTouchForm} onSubmit={handleSubscribe}>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default StayInTouch;
