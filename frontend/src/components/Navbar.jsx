import React from "react";
import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

const Navbar = () => {
  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }
  return (
    <>
      <div className={classes.navbarWrapper}>
        <nav className={`${classes.navbar} container`}>
          <div className={classes.dropdown}>
            <button className={classes.dropbtn}>
              <img src="/icons/menu_bar.png" alt="Menu bar" /> PRODUCTS
              <i className="fas fa-angle-down down-angle"></i>
            </button>
            <div className={classes.dropdownContentWrapper}>
              <div className={`${classes.dropdownContent} container`}>
                <div>
                  <h6>OPTICS</h6>
                  <a href="/subcategory/rifle scopes">Rifle scopes</a>
                  <a href="/subcategory/binoculars">Binoculars</a>
                  <a href="/subcategory/rangefinders">Rangefinders</a>
                  <a href="/subcategory/red dots">Red dots</a>
                  <a href="/subcategory/rings & mounts">Rings & mounts</a>
                  <a href="/subcategory/accessories">Accessories</a>
                </div>
                <div>
                  <h6>RIFLE COMPONENTS</h6>
                  <a href="/subcategory/actions">Actions</a>
                  <a href="/subcategory/barrels">Barrels</a>
                  <a href="/subcategory/triggers">Triggers</a>
                  <a href="/subcategory/muzzle brakes">Muzzle brakes</a>
                  <a href="/subcategory/bottom metal & magazines">
                    Bottom metal & magazines
                  </a>
                </div>
                <div>
                  <h6>NIGHT VISION & THERMAL</h6>
                  <a href="/subcategory/scopes">Scopes</a>
                  <a href="/subcategory/monoculars & binoculars">
                    Monoculars & binoculars{" "}
                  </a>
                </div>
                <div>
                  <h6>BIPODS & BAGS</h6>
                  <a href="/subcategory/bipods">Bipods</a>
                  <a href="/subcategory/shooting bags">Shooting bags</a>
                </div>
                <div>
                  <h6>CLEANING SUPPILES</h6>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.dropdown}>
            <button className={classes.dropbtn}>
              BRANDS
              <i className="fas fa-angle-down down-angle"></i>
            </button>
            <div className={classes.dropdownContentWrapper}>
              <div className={`${classes.dropdownContent} container`}>
                <div>
                  <a className={classes.brand} href="/brand/kahles">
                    Kahles
                  </a>
                  <a className={classes.brand} href="/brand/nightforce">
                    Nightforce
                  </a>
                </div>
                <div>
                  <a className={classes.brand} href="/brand/pulsar">
                    Pulsar
                  </a>
                  <a className={classes.brand} href="/brand/hawkins">
                    HAWKINS
                  </a>
                </div>
                <div>
                  <a className={classes.brand} href="/brand/vortex">
                    VORTEX
                  </a>
                  <a className={classes.brand} href="/brand/defiance machine">
                    DEFIANCE MACHINE
                  </a>
                </div>
                <div>
                  <a className={classes.brand} href="/brand/borden">
                    Borden
                  </a>
                  <a className={classes.brand} href="/brand/trigger tech">
                    TRIGGER TECH
                  </a>
                </div>
                <div>
                  <a className={classes.brand} href="/brand/jewel">
                    JEWEL
                  </a>
                  <a className={classes.brand} href="/brand/terminator">
                    TERMINATOR
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Link to="/gallery">GALLERY</Link>
          <Link to="/our-story">OUR STORY</Link>
        </nav>
        {/* <div className={classes.sidenavWrapper}>
          <div className={classes.sidenavContent}>
            <nav className={classes.sidenav}>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#clients">Clients</a>
              <a href="#contact">Contact</a>
              <button class="dropdown-btn">
                Dropdown
                <i className="fa fa-caret-down"></i>
              </button>
              <div className={classes.dropdownContainer}>
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
                <button className={classes.dropdownBtn}>
                  Dropdown
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className={classes.dropdownContainer}>
                  <a href="#">Link 1</a>
                  <a href="#">Link 2</a>
                  <a href="#">Link 3</a>
                </div>
              </div>
              <a href="#contact">Search</a>
            </nav>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;
