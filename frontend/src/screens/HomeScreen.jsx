import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import CivilianMilitaryMembershipEvents from "../components/CivilianMilitaryMembershipEvents";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
// import HomeBanner from '../components/HomeBanner'
// import Header from "../components/Header";
import HomeBanner from "../components/HomeBanner";
import OurStory from "../components/OurStory";
import PopularCategory from "../components/PopularCategory";
import PopularItems from "../components/PopularItems";
import StayInTouch from "../components/StayInTouch";
import VerifiedShippingSecure from "../components/VerifiedShippingSecure";
import Testimonial from "../components/Testimonial";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const [spinner, setSpinner] = useState(true);
  // const dispatch = useDispatch()
  const { products } = useSelector((state) => state.productsReducer);

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
          <HomeBanner />
          <VerifiedShippingSecure products={products} />
          <PopularCategory />
          {/* {products.map(product => (
        <PopularItems product={product} />
      ))} */}
          <PopularItems products={products} />
          {/* <CivilianMilitaryMembershipEvents /> */}
          <ContactUs />
          <OurStory />
          <Testimonial />
          <StayInTouch />
          <Footer />
        </>
      )}
    </>
  );
};

export default HomeScreen;
