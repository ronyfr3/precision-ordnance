import React from "react";

import HeaderTop from "./HeaderTop";
import Navbar from "./Navbar";

import classes from './Header.module.css'

const Header = () => {
  return (
    <header className={classes.headerSection}>
        <HeaderTop />
        <Navbar />
        {/* <div class="mobile-menu-wrapper container">
        <ul>
          <li>
            <a onclick="openNav()" href="#"><i class="fas fa-bars"></i></a>
          </li>
          <li>
            <a href="#"
              ><img src="icons/po_logo.png" alt="Precision Ordnance"
            /></a>
          </li>
          <li>
            <div>
              <a href="#">
                <img src="icons/cart.png" alt="Cart Icon" /> <span>1</span></a
              >
            </div>
            <a href="#">Join</a>
          </li>
        </ul>
      </div> */}
        {/* <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()"
          >&times;</a
        >
        <button class="accordion">Section 1</button>
        <div class="panel">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <button class="accordion">Section 2</button>
        <div class="panel">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <button class="accordion">Section 3</button>
        <div class="panel">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
