import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import classes from "./AdminOrderDetailsScreen.module.css";
import Loader from "../components/Loader";

const AdminOrderDetailsScreen = ({ match, history }) => {
  const [spinner, setSpinner] = useState(true);
  const id = match.params.id;
  const { orders } = useSelector((state) => state.orderReducer);
  const { userInfo } = useSelector((state) => state.userSignin);
  const singleOrder = orders.find((o) => o._id === id);
  console.log(singleOrder);

  let location = useLocation();
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/")
    }
    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }, [location.pathname, history]);
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.orderDetailsScreen}>
          <AdminSidebar />
          <div className={classes.orderDetailsWrapper}>
            <AdminNavbar history={history} />
            <div className={classes.orderDetailsRight}>
              <h4>ORDER DETAILS</h4>
              <div className={classes.orderAllLists}>
                <div className={classes.orderAllListsLeft}>
                  <ul>
                    <li>
                      <span>items summary</span>
                      <span>qty</span>
                      <span>price</span>
                      <span>total price</span>
                    </li>
                    <li>
                      <span className={classes.titleAndImage}>
                        <img
                          src={`/uploads/${singleOrder?.orderItems[0]?.image[0]?.filename}`}
                          alt=""
                        />
                        {singleOrder?.orderItems[0]?.title}
                      </span>
                      <span>{singleOrder?.orderItems[0]?.qty}</span>
                      <span>{singleOrder?.orderItems[0]?.price}</span>
                      <span>{singleOrder?.totalPrice}</span>
                    </li>
                  </ul>
                  <ul>
                    <li>Customer info</li>
                    <li>
                      <span>Frist Name</span>
                      <span>{singleOrder?.user?.first_name}</span>
                    </li>
                    <li>
                      <span>Last Name</span>
                      <span>{singleOrder?.user?.last_name}</span>
                    </li>
                    <li>
                      <span>Email</span>
                      <span>{singleOrder?.user?.email}</span>
                    </li>
                    <li>
                      <span>Last Name</span>
                      <span>{singleOrder?.user?.mobile}</span>
                    </li>
                  </ul>
                </div>
                <div className={classes.orderAllTablesRight}>
                  <ul>
                    <li>Delivery Address</li>
                    <li>
                      <span>Address</span>
                      <span>{singleOrder?.shippingAddress?.address}</span>
                    </li>
                    <li>
                      <span>City</span>
                      <span>{singleOrder?.shippingAddress?.city}</span>
                    </li>
                    <li>
                      <span>Street</span>
                      <span>{singleOrder?.shippingAddress?.city}</span>
                    </li>
                    <li>
                      <span>State</span>
                      <span>{singleOrder?.shippingAddress?.city}</span>
                    </li>
                    <li>
                      <span>Country</span>
                      <span>{singleOrder?.shippingAddress?.country}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminOrderDetailsScreen;
