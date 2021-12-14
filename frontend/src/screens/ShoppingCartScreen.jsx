import React, {useState, useEffect} from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ShoppingCart from "../components/ShoppingCart";
import ShoppingCartBanner from "../components/ShoppingCartBanner";
import StayInTouch from "../components/StayInTouch";
import Loader from '../components/Loader';

const ShoppingCartScreen = () => {
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
          <ShoppingCartBanner />
          <ShoppingCart />
          <StayInTouch />
          <Footer />
        </>
      )}
    </>
  );
};

export default ShoppingCartScreen;
