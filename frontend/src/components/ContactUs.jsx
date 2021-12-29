import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./ContactUs.module.css";

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: "",
  });

  const changeContactInfo = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };
  const submitContactInfo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/ContactUs", contactInfo);
      toast(data.message);
    } catch (err) {
      toast(err.response.data.message);
    }
    setContactInfo({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <section className={classes.contactUsSection}>
      <div className={`${classes.contactUsWrapper} container`}>
        <div className={classes.contactUsContent}>
          <div className={classes.contactUsAddress}>
            <h3>Contact Us</h3>
            <p>
              For all inquires please mail us on <br /> <span style={{display: 'block',fontSize: '1.8rem', fontWeight: '600', marginTop: '1.5rem'}}>precisionordnance@bigpond.com</span> 
            </p>
            <div className={classes.address}>
              <img src="/icons/map.png" alt="Map" />
              <p>P.O. Box 78 Glenorchy, Tasmania 7010</p>
            </div>
          </div>
          <div className={classes.contactUsForm}>
            <h4>Message Your Inquires</h4>
            <form onSubmit={submitContactInfo}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={contactInfo.name}
                  onChange={changeContactInfo}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={contactInfo.email}
                  onChange={changeContactInfo}
                />
              </div>
              <div>
                <textarea
                  placeholder="Type your message"
                  name="message"
                  id=""
                  cols="10"
                  rows="10"
                  value={contactInfo.message}
                  onChange={changeContactInfo}
                ></textarea>
              </div>
              <div className={classes.submitBtn}>
                <button className="btn">Submit</button>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
