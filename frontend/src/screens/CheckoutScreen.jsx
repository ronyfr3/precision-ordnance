import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Checkout from "../components/Checkout";
import CheckoutBanner from "../components/CheckoutBanner";
import Loader from "../components/Loader";

const CheckoutScreen = ({ history }) => {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <>
          {/* <Header /> */}
          <CheckoutBanner />
          <Checkout history={history} />
          <Footer />
        </>
      )}
    </>
  );
};

export default CheckoutScreen;
