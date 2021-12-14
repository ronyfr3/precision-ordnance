import React from "react";
import { Link } from 'react-router-dom'

import classes from './Navbar.module.css'

const Navbar = () => {
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
                  <Link to='/subcategory/rafle scopes'>Rifle scopes</Link>
                  <Link to="/subcategory/binoculars">Binoculars</Link>
                  <Link to="/subcategory/rangefinders">Rangefinders</Link>
                  <Link to="/subcategory/red dots">Red dots</Link>
                  <Link to="/subcategory/rings & mounts">Rings & mounts</Link>
                  <Link to="/subcategory/accessories">Accessories</Link>
                </div>
                <div>
                  <h6>RIFLE COMPONENTS</h6>
                  <Link to="/subcategory/actions">Actions</Link>
                  <Link to="/subcategory/barrels">Barrels</Link>
                  <Link to="/subcategory/triggers">Triggers</Link>
                  <Link to="/subcategory/muzzle brakes">Muzzle brakes</Link>
                  <Link to="/subcategory/bottom metal & magazines">Bottom metal & magazines</Link>
                </div>
                <div>
                  <h6>NIGHT VISION & THERMAL</h6>
                  <Link to="/subcategory/scopes">Scopes</Link>
                  <Link to="/subcategory/monoculars & binoculars">Monoculars & binoculars </Link>
                </div>
                <div>
                  <h6>BIPODS & BAGS</h6>
                  <Link to="/subcategory/bipods">Bipods</Link>
                  <Link to="/subcategory/shooting bags">Shooting bags</Link>
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
                  <Link className={classes.brand} to="/brand/kahles">Kahles</Link>
                  <Link className={classes.brand} to="/brand/nightforce">Nightforce</Link>
                  <Link className={classes.brand} to="/brand/jewel">JEWEL</Link>
                </div>
                <div>
                  <Link className={classes.brand} to="/brand/hawkins">HAWKINS</Link>
                  <Link className={classes.brand} to="/brand/vortex">VORTEX</Link>
                </div>
                <div>
                  <Link className={classes.brand} to="/brand/borden">BORDEN</Link>
                  <Link className={classes.brand} to="/brand/tigger tech">TRIGGER TECH</Link>
                </div>
                <div>
                  <Link className={classes.brand} to="/brand/terminator">TERMINATOR</Link>
                  <Link className={classes.brand} to="/brand/pulsar">PULSAR</Link>
                </div>
                <div>
                  <Link className={classes.brand} to="/brand/accutac">ACCUTAC</Link>
                  <Link className={classes.brand} to="/brand/defiance machine">DEFIANCE MACHINE</Link>
                </div>
              </div>
            </div>
          </div>
          <Link to="/gallery">GALLERY</Link>
          <Link to="/our-story">OUR STORY</Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
