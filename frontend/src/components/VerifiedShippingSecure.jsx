import React from "react";

import classes from "./VerifiedShippingSecure.module.css";

const VerifiedShippingSecure = () => {
  return (
    <section className={classes.verifiedShippingSecureSection}>
      <div className={`${classes.verifiedShippingSecureWrapper} container`}>
        <div className={classes.verifiedShippingSecureContent}>
          <div>
            <img src="/icons/verified_logo.png" alt="Verified" />
            <h4>Licensed & Verified</h4>
            <p>Experienced over 8+ years in Gunsmithing</p>
          </div>
          <div>
            <img src="/icons/shipping_logo.png" alt="Shipping" />
            <h4>Free Shipping</h4>
            <p>On orders over $150, conditions apply</p>
          </div>
          <div>
            <img src="/icons/secure_logo.png" alt="Secure" />
            <h4>7 Day Return</h4>
            <p>
              Didn’t like what you bought? Tell us for a 7-Day Return experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedShippingSecure;
