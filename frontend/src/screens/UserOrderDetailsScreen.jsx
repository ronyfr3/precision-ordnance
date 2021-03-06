import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./UserOrderDetailsScreen.module.css";
import Loader from "../components/Loader";

const UserOrderDetailsScreen = ({ match, history }) => {
  const [spinner, setSpinner] = useState(true);
  const id = match.params.id;
  const { orders } = useSelector((state) => state.orderReducer);
  const { userInfo } = useSelector((state) => state.userSignin);
  const singleOrder = orders?.find((o) => o._id === id);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
    setTimeout(() => setSpinner(false), 500);
  }, [history, userInfo]);
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.orderDetailsScreen}>
          <div className={`${classes.orderDetailsWrapper} container`}>
            <div className={classes.orderDetailsRight}>
              <h4>ORDER DETAILS</h4>
              <div className={classes.orderAllLists}>
                <div className={classes.orderAllListsLeft}>
                  <ul className={classes.itemsSummary}>
                    <li>
                      <span>items summary</span>
                      <span>qty</span>
                      <span>price</span>
                      <span>total price</span>
                    </li>
                    {singleOrder?.orderItems?.map((orderItem) => (
                      <li>
                        <span className={classes.titleAndImage}>
                          <img
                            src={`/uploads/${orderItem?.image[0]?.filename}`}
                            alt=""
                          />
                          {orderItem?.title}
                        </span>
                        <span>{orderItem?.qty}</span>
                        <span>{orderItem?.price}</span>
                        <span>{orderItem?.totalPrice}</span>
                      </li>
                    ))}
                  </ul>
                  <ul>
                    <li>Customer info</li>
                    <li>
                      <span>Frist Name</span>
                      <span>{singleOrder?.userInfo?.first_name}</span>
                    </li>
                    <li>
                      <span>Last Name</span>
                      <span>{singleOrder?.userInfo?.last_name}</span>
                    </li>
                    <li>
                      <span>Email</span>
                      <span>{singleOrder?.userInfo?.email}</span>
                    </li>
                    <li>
                      <span>Last Name</span>
                      <span>{singleOrder?.userInfo?.mobile}</span>
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
                      <span>Suburb</span>
                      <span>{singleOrder?.shippingAddress?.suburb}</span>
                    </li>
                    <li>
                      <span>Post Code</span>
                      <span>{singleOrder?.shippingAddress?.postcode}</span>
                    </li>
                    <li>
                      <span>State</span>
                      <span>{singleOrder?.shippingAddress?.state}</span>
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

export default UserOrderDetailsScreen;
