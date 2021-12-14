import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import classes from "./AdminDashboardScreen.module.css";
import { useSelector } from "react-redux";
import ApexCharts from "./charts/ApexCharts";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const AdminDashboardScreen = ({ history }) => {
  const [spinner, setSpinner] = useState(true);

  const { userInfo } = useSelector((state) => state.userSignin);
  const { orders } = useSelector((state) => state.orderReducer);
  console.log(orders);
  const state = useSelector((state) => state);
  // console.log(state.orderReducer.orders);
  let sum = 0;
  for (let i = 0; i < state?.orderReducer?.orders?.length; i++) {
    sum += state?.orderReducer?.orders[i]?.totalPrice;
  }
  console.log(sum);
  let location = useLocation();
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }
    localStorage.setItem("path", location.pathname);

    setTimeout(() => setSpinner(false), 500);
  }, [location.pathname, history]);
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.dashboardSection}>
          <AdminSidebar />
          <div className={classes.dashboardContentRight}>
            <AdminNavbar history={history} />
            <div className={classes.shopOverview}>
              <h4>SHOP OVERVIEW</h4>
              <div className={classes.salesOrdersRevenues}>
                <div className={classes.sales}>
                  <div className={classes.salesLeft}>
                    <h6>TOTAL SALES</h6>
                    <h3>$ {sum}</h3>
                  </div>
                  <div className={classes.salesRight}>
                    <img src="/images/graph_1.png" alt="" />
                  </div>
                </div>
                <div className={classes.orders}>
                  <div className={classes.ordersLeft}>
                    <h6>TOTAL ORDERS</h6>
                    <h3>{state?.orderReducer?.orders?.length}</h3>
                  </div>
                  <div className={classes.ordersRight}>
                    <img src="/images/graph_2.png" alt="" />
                  </div>
                </div>
                <div className={classes.revenues}>
                  <div className={classes.revenuesLeft}>
                    <h6>TOTAL REVENUES</h6>
                    <h3>$ {sum}</h3>
                  </div>
                  <div className={classes.revenuesRight}>
                    <img src="/images/graph_3.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.earningsRunningOrders}>
              <div className={classes.earnigs}>
                <div className={classes.headEarnings}>
                  <div className={classes.leftHeadEarnings}>
                    <h5>EARNINGS</h5>
                  </div>
                  {/* <div className={classes.rightHeadEarnings}>
                <p>Last 6 Month</p>
                <i className="fas fa-chevron-down"></i>
              </div> */}
                </div>
                <div className={classes.calculationEarnings}>
                  <ApexCharts />
                </div>
              </div>
              <div className={classes.runningOrders}>
                <div className={classes.headRunningOrders}>
                  <div className={classes.leftHeadRunningOrders}>
                    <h5>RUNNING ORDERS</h5>
                  </div>
                  <div className={classes.rightHeadRunningOrders}>
                    <p>See all</p>
                  </div>
                </div>
                <div className={classes.productOrders}>
                  <div className={classes.orderLine}>
                    <div className={classes.imgName}>
                      <img src="/images/cart_img.png" alt="" />
                      <h6>M416 (5.56)</h6>
                    </div>
                    <div className={classes.price}>
                      <p>$ 2200.00 (1pc)</p>
                    </div>
                  </div>
                  <div className={classes.orderLine}>
                    <div className={classes.imgName}>
                      <img src="/images/cart_img.png" alt="" />
                      <h6>M416 (5.56)</h6>
                    </div>
                    <div className={classes.price}>
                      <p>$ 2200.00 (1pc)</p>
                    </div>
                  </div>
                  <div className={classes.orderLine}>
                    <div className={classes.imgName}>
                      <img src="/images/cart_img.png" alt="" />
                      <h6>M416 (5.56)</h6>
                    </div>
                    <div className={classes.price}>
                      <p>$ 2200.00 (1pc)</p>
                    </div>
                  </div>
                  <div className={classes.orderLine}>
                    <div className={classes.imgName}>
                      <img src="/images/cart_img.png" alt="" />
                      <h6>M416 (5.56)</h6>
                    </div>
                    <div className="price">
                      <p>$ 2200.00 (1pc)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.lastOrder}>
              <div className={classes.headLastOrder}>
                <div className={classes.leftHeadLastOrder}>
                  <h5>LAST ORDERS</h5>
                </div>
                <div className={classes.rightHeadLastOrder}>
                  <p>Last 6 Month</p>
                  <i className="fas fa-chevron-down"></i>
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
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {orders?.map((order) => (
                    <tr key={order._id}>
                      <td className={classes.cheakboxAllign}>
                        <input type="checkbox" />
                        <p>{order._id}</p>
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
                        <p>{order?.user?.first_name}</p>
                      </td>
                      <td>
                        <p>Delivered</p>
                      </td>
                      <td className={classes.rightAction}>
                        <p>
                          <i className="fas fa-ellipsis-v"></i>
                        </p>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminDashboardScreen;
