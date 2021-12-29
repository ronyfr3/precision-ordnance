import React, { useState } from "react";
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from "react-router-dom";
import WorkInProgress from "./WorkInProgress";
import ScrollButton from "./ScrollButton";
// import Modal from "./Modal";

import classes from "./Footer.module.css";

const Footer = () => {
  const [show, setShow] = useState(false);

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
    })
  }

  const modal = (
    <section className={classes.modalSection}>
      <div className={classes.modalWrapper}>
        {show ? (
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
              {/* <ToastContainer /> */}
            </form>
            <span onClick={() => setShow(!show)} className={classes.times}>
              <i className="far fa-times-circle"></i>
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );

  return (
    <>
      <footer className={classes.footerTopSection}>
        <div className={`${classes.footerTopWrapper} container`}>
          <div className={classes.footerTopContent}>
            <div>
              <h6>Opening Hours</h6>
              <ul>
                <li>Mon-Fri: 9:00am-5:00pm</li>
                <li>
                  Sat - Sun: <span className={classes.closed}>Closed</span>
                </li>
              </ul>
            </div>
            <div>
              <h6>Categories</h6>
              <ul>
                <li>
                  <Link to="/category/optics">Optics</Link>
                </li>
                <li>
                  <Link to="/category/rifle components">Rifle Components</Link>
                </li>
                <li>
                  <Link to="/category/gun parts">Gun Parts</Link>
                </li>
                <li>
                  <Link to="/category/night vision & thermal">
                    Night Vision & Thermal
                  </Link>
                </li>
                <li>
                  <Link to="/category/bipod & bags">Bipod & Bags</Link>
                </li>
                <li>
                  <Link to="/category/cleanning supplies">
                    Cleanning Supplies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6>Customer Service</h6>
              <ul>
                <li>
                  <Link to="/">Privacy policy</Link>
                </li>
                <li>
                  <Link to="/">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  {show ? (
                    <>
                      <span
                        className={classes.modal}
                        onClick={() => setShow(!show)}
                      >
                        Contact Us
                      </span>
                      {modal}
                    </>
                  ) : (
                    <span
                      className={classes.modal}
                      onClick={() => setShow(!show)}
                    >
                      Contact Us
                    </span>
                  )}
                </li>
              </ul>
            </div>
            <div>
              <h6>Social Media</h6>
              <div className={classes.socialMediaIcon}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/precisionordnance"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/precisionordnance/"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              {/* <h6>Payment methods</h6> */}
              {/* <div className={classes.paymentMethodsIcon}>
                <img src="/icons/visa.png" alt="Visa" />
                <img src="/icons/mastercard.png" alt="Mastercard" />
                <img src="/icons/paypal.png" alt="Paypal" />
                <img src="/icons/applepay.png" alt="Apple pay" />
              </div> */}
            </div>
          </div>
        </div>
        <div className={classes.footerBottomContent}>
          <div>Copyright @ All Rights Reserved | Precison Ordnance 2021</div>
          <div className={classes.markosis}>
            (Developed by{" "}
            <a target="_blank" href="http://markosis.com.au/">
              <img src="/icons/markosis_logo.png" alt="" /> Markosis
            </a>
            )
          </div>
        </div>
      </footer>
      {/* <WorkInProgress /> */}
      <ScrollButton />
    </>
  );
};

export default Footer;
