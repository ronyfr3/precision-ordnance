import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import AdminNavbar from "../components/AdminNavbar"
import AdminSidebar from "../components/AdminSidebar"
import Loader from "../components/Loader"
import classes from "./AdminOrderlistScreen.module.css"
import ReactTable2 from "./ReactTable2"

const AdminOrderlistScreen = ({ history }) => {
  const [spinner, setSpinner] = useState(true)
  // const { orders } = useSelector((state) => state.orderReducer)
  const { userInfo } = useSelector((state) => state.userSignin)
  let location = useLocation()
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/")
    }
    localStorage.setItem("path", location.pathname)
    setTimeout(() => setSpinner(false), 500)
  }, [location, history, userInfo])
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.adminOrderListSection}>
          <AdminSidebar />
          <div className={classes.adminOrderListRight}>
            <AdminNavbar history={history} />
            <div className={classes.adminAllOrderList}>
              <h4>ALL ORDER LIST</h4>
            </div>
              <ReactTable2 />
          </div>
        </section>
      )}
    </>
  )
}
export default AdminOrderlistScreen
