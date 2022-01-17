import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminSidebar from '../components/AdminSidebar'
import AdminNavbar from '../components/AdminNavbar'
import Loader from '../components/Loader'
import classes from "./AdminDeliveryOrder.module.css";

const AdminDeliveryOrder = ({ history }) => {
  const [spinner, setSpinner] = useState(true);

  let location = useLocation();
  const { orders } = useSelector((state) => state.orderReducer);
  const { userInfo } = useSelector((state) => state.userSignin);

  const orderDelivered = orders?.filter(order => order?.isDelivered === true)

  console.log(orderDelivered);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/")
    }
    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }, [location.pathname, userInfo, history]);
  return (
    <>
    {spinner ? <Loader /> : <section className={classes.adminDeliveryOrderSection}>
      <AdminSidebar />
      <div className={classes.adminDeliveryOrderRigth}>
        <AdminNavbar/>
        <div className={classes.lastOrder}>
      <div className={classes.headLastOrder}>
        <div className={classes.leftHeadLastOrder}>
          <h5>Order Delivered</h5>
        </div>
      </div>

      <div className={classes.ordersWrapper}>
        <table>
          <tr>
            <th className={classes.cheakboxAllign}>
              <input type="checkbox" />
              <p className={classes.headerLine}>Serial no.</p>
            </th>
            <th>Product name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
          </tr>

          {orderDelivered?.map((order) => (
            <tr key={order._id}>
              <td className={classes.cheakboxAllign}>
                <input type="checkbox" />
                <p>{order._id.substring(1, 6)}</p>
              </td>
              <td>
                <p>{order?.orderItems[0]?.title}</p>
              </td>
              <td>
                <p>{order?.orderItems[0]?.category}</p>
              </td>
              <td>
                <p>$ {order?.orderItems[0]?.price}</p>
              </td>

              <td>
                <p>{order?.isDelivered ? "Delivered" : "Processing"}</p>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
      </div>
    </section>}
    </>
  );
};

export default AdminDeliveryOrder;
