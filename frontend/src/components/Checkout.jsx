import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sgMail from "@sendgrid/mail";
import classes from "./Checkout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../actions/orderActions";
import axios from "axios";
// import Paypal from "./Paypal";

const Checkout = ({ history }) => {
  const [hookState, setHookState] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  // const tax =
  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);
  console.log("cartitem", cartItems);
  const [val, setval] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    address: "",
    postcode: "",
    suburb: "",
    state: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setval({
      ...val,
      [name]: value,
    });
  };

  const pp = [];
  cartItems.map((x) =>
    pp.push({
      title: x.title,
      category: x.title,
      subcategory: x.subcategory,
      longdescription: x.longdescription,
      shortdescription: x.shortdescription,
      names: x.names,
      values1: x.values1,
      values2: x.values2,
      qty: x.qty,
      image: x.image,
      price: x.price,
      // pass product as product id for populate
      product: x.product,
    })
  );

  const handleState = (e) => {
    e.preventDefault();
    setHookState(e.target.value);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/signin-signup");
    }
  }, [userInfo, history]);

  console.log("pp", pp);

  const orderData = {
    user: userInfo._id,
    userInfo: {
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      mobile: val.mobile,
    },
    orderItems: pp,
    shippingAddress: {
      address: val.address,
      postcode: val.postcode,
      suburb: val.suburb,
      state: hookState,
    },
    shippingPrice: 150,
    totalPrice: totalPrice,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.isAdmin === true) {
      subscribeUser();
    } else {
      console.log("you are not admin");
    }
    dispatch(createOrder(orderData));
    sendNotify()
    // axios.post("api/orders", orderData).then((res) => console.log(res.data));
    history.push("/order");
  };
  // notification
  const convertedVapidKey = urlBase64ToUint8Array(
    "BDoTumj2UX0sR8Vwq5rRZo8JzWlz_WVUXcKUIcJFKBJbRBdbuGkPERc_SHvJLDNL4o7c1Gc05HHoUGCGa-40EN4"
  );

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    // eslint-disable-next-line
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function sendNotify() {
    return fetch(`/api/notifi`, {
      method: "POST",
      body: JSON.stringify({
        user: userInfo._id,
        message: `${userInfo._id} is ordered`,
        details: {
          productName: pp[0].title,
          totalPrice,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //   user:String,
  //  message:String,
  //  details:{
  //      productName:String,
  //      totalPrice:Number,
  //      link:String
  //  }
  function sendSubscription(subscription) {
    return fetch(`/notifications/subscribe`, {
      method: "POST",
      body: JSON.stringify({
        subscription: subscription,
        title: "Notified by Precision Ordance",
        description: `${userInfo.name} is ordered`,
        icon: `${process.env.PUBLIC_URL}/icons/po_logo.png`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  function subscribeUser() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(function (registration) {
          if (!registration.pushManager) {
            console.log("Push manager unavailable.");
            return;
          }

          registration.pushManager
            .getSubscription()
            .then(function (existedSubscription) {
              if (existedSubscription === null) {
                console.log("No subscription detected, make a request.");
                registration.pushManager
                  .subscribe({
                    applicationServerKey: convertedVapidKey,
                    userVisibleOnly: true,
                  })
                  .then(function (newSubscription) {
                    console.log("New subscription added.", newSubscription);
                    sendSubscription(newSubscription);
                  })
                  .catch(function (e) {
                    if (Notification.permission !== "granted") {
                      console.log("Permission was not granted.");
                    } else {
                      console.error(
                        "An error ocurred during the subscription process.",
                        e
                      );
                    }
                  });
              } else {
                console.log("Existed subscription detected.");
                sendSubscription(existedSubscription);
              }
            });
        })
        .catch(function (e) {
          console.error(
            "An error ocurred during Service Worker registration.",
            e
          );
        });
    } else {
      console.log("Can not reachable to the service worker");
    }
  }

  return (
    <section className={classes.checkoutSection}>
      <div className={`${classes.checkoutWrapper} container`}>
        <div className={classes.checkoutLeft}>
          <form className={classes.checkoutForm} onSubmit={handleSubmit}>
            <div className={classes.personalInformation}>
              <h5>Personal Information</h5>
              <div className={classes.firstLastName}>
                <div className={classes.firstName}>
                  <input
                    placeholder="First name"
                    type="text"
                    name="first_name"
                    value={val.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={classes.lastName}>
                  <input
                    placeholder="Last name"
                    type="text"
                    name="last_name"
                    value={val.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  placeholder="Email address"
                  type="email"
                  name="email"
                  value={val.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={classes.mobile}>
                <input
                  placeholder="Mobile"
                  type="text"
                  name="mobile"
                  value={val.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={classes.shipping}>
              <h5>Shipping</h5>
              <div className={classes.houseAptLocal}>
                <input
                  placeholder="Street address"
                  type="text"
                  name="address"
                  value={val.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={classes.streetLocal}>
                <div className={classes.street}>
                  <input
                    placeholder="Suburb"
                    type="text"
                    name="suburb"
                    value={val.suburb}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={classes.local}>
                  <input
                    placeholder="Postcode"
                    type="text"
                    name="postcode"
                    value={val.postcode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* <div className={classes.houseAptLocal}>
                <input
                  placeholder="State"
                  type="text"
                  name="state"
                  value={val.state}
                  onChange={handleChange}
                  required
                />
              </div> */}
              <select
                value={hookState}
                onChange={handleState}
                className={classes.state}
                name=""
                id=""
              >
                <option value="">Select State...</option>
                <option value="New South Wales">New South Wales</option>
                <option value="Queensland">Queensland</option>
                <option value="South Australia">South Australia</option>
                <option value="Tasmania">Tasmania</option>
                <option value="Victoria">Victoria</option>
                <option value="Western Australia">Western Australia</option>
              </select>
              {/* <div className={classes.saveAs}>
                <input type="checkbox" /> <span>Save as default address</span>
              </div> */}
            </div>
            {/* <div className={classes.payment}>
              <h5>Payment</h5>
              <div className={classes.paypalDebitCard}>
                <label htmlFor="paypal" className={classes.paypal}>
                  <span>Paypal/Skrill/Crypto</span>
                  <input name="payment" id="paypal" type="radio" />
                </label>
                <label htmlFor="debit-card" className={classes.debitCard}>
                  <span>Credit or Debit Card</span>
                  <input name="payment" id="debit-card" type="radio" />
                </label>
              </div>
              <div className={classes.number}>
                <input placeholder="Card number" type="number" />
              </div>
              <div className={classes.dateCvc}>
                <div className={classes.date}>
                  <input placeholder="Expire Date" type="date" />
                </div>
                <div className={classes.cvc}>
                  <input placeholder="CVC" type="text" />
                </div>
              </div>
            </div> */}
            <div className={classes.checkoutButtons}>
              {/* <Paypal/> */}
              {/* disable css by conditionally */}
              <button type="submit" className={`${classes.confirmBtn} btn`}>
                Confirm & Pay
              </button>
            </div>
          </form>
        </div>
        <div className={classes.checkoutRight}>
          <div className={classes.checkoutRightHeading}>
            <h4>Summary</h4>
            <Link to="/">Back to Cart</Link>
          </div>
          <ul>
            <li>
              <p>Item</p>
              <span>{totalItems}</span>
            </li>
            <li>
              <p>Subtotal</p>
              <span>{totalPrice} aud</span>
            </li>
            {/* <li>
              <p>Shipping</p>
              <span>200.00 aud</span>
            </li>
            <li>
              <p>Tax(25%)</p>
              <span>350.00 aud</span>
            </li> */}
            {/* <li>
              <p>Discount</p>
              <span>-150.00 aud</span>
            </li> */}
            <li>
              <p>Total</p>
              <span>{totalPrice} aud</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
