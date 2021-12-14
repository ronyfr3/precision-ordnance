import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../actions/userActions";

import classes from "./HeaderTop.module.css";
import { listQueryProducts } from "../actions/QueryProduct";
import { useHistory, useLocation } from "react-router-dom";

const HeaderTop = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const showHandler = (e) => {
    setShow(!show);
  };

  const logoutHandler = (e) => {
    dispatch(logout());
  };
  const [inp, setInp] = useState("");
  console.log("inputSearch", inp);

  let history = useHistory();
  let location = useLocation();
  const paths = `/search/${inp}`;
  const changeRouteWithSearch = (e) => {
    setInp(e.target.value);
    history.push(`/search/${e.target.value}`);
    dispatch(listQueryProducts(inp.toString().toUpperCase()));
  };
  useEffect(() => {
    if (paths !== location.pathname) {
      setInp("");
    }
  }, [location.pathname]);
  console.log("pathname", location.pathamne);
  const fetchQueryProducts = () => {
    dispatch(listQueryProducts(inp.toString().toUpperCase()));
    history.push(`/search/${inp}`);
  };

  const adminUserRedirect = () => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        return <Link to="/admin/dashboard">Admin</Link>;
      } else if (!userInfo.isAdmin) {
        return (
          <div className={classes.userSigninDropdown}>
            <span onClick={showHandler}>
              {userInfo?.name} <i className="fas fa-sort-down"></i>
            </span>
            <ul
              className={`${classes.userSigninList} ${
                show ? classes.dropdownShow : ""
              } `}
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li onClick={logoutHandler}>logout</li>
            </ul>
          </div>
        );
      }
    } else {
      return (
        <Link to="/signin-signup" className={classes.loginPlace}>
          SIGNIN / JOIN
        </Link>
      );
    }
  };

  return (
    <div className={`${classes.headerTopWrapper} container`}>
      <div className={classes.headerTop}>
        <form className={classes.headerTopLeft}>
          {/* search */}
          <input
            type="text"
            placeholder="Search"
            name="inp"
            value={inp}
            // onChange={(e) => setInp(e.target.value)}
            onChange={changeRouteWithSearch}
          />

          <span className={classes.searchIcon}><i className="fas fa-search"></i></span>
        </form>
        <div className={classes.headerTopMiddle}>
          <Link to="/">
            <img src="/icons/po_logo.png" alt="Precision Ordnance Logo" />
          </Link>
        </div>
        <div className={classes.headerTopRight}>
          {/* <div className={classes.headerTopRightFirst}>
            <i className="fas fa-dollar-sign"></i>
            <p className={classes.currency}>AUD</p>
            <i className="fas fa-angle-down down-angle"></i>
          </div> */}
          <Link to="/shopping-cart" className={classes.headerTopRightSecond}>
            <div>
              <i className="fas fa-shopping-bag"></i>
            </div>
            {cartItems.length > 0 ? (
              <span>{cartItems.length}</span>
            ) : (
              <span>0</span>
            )}
          </Link>
          <div className={classes.headerTopRightThird}>
            {adminUserRedirect()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
