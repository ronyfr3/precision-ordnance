import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import Slider from "react-slick";
import { addToCart } from "../actions/cartActions";
import {
  listProductDetails,
  // createProductReview,
} from "../actions/productsAction";
import Footer from "../components/Footer";
// import SpecificationAndReviews from "../components/Product"
// import RelatedProduct from "../components/RelatedProduct"
import StayInTouch from "../components/StayInTouch";
import Rating from "../components/Rating";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import classes from "./ProductDetailsScreen.module.css";
import Loader from "../components/Loader";

const ProductDetailsScreen = ({ match, history }) => {
  const [spinner, setSpinner] = useState(true);
  const { userInfo } = useSelector((state) => state.userSignin);

  let slider1;
  let slider2;
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const id = match.params.id;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { product } = productDetails;

  console.log("product details", product);

  const values = product?.productInfo?.info?.values1?.map((value) => value);

  useEffect(() => {
    dispatch(listProductDetails(id));
    setNav1(slider1);
    setNav2(slider2);
    window.scrollTo(0, 0);
  }, [dispatch, id, slider1, slider2]);

  const addToCartHandler = (qty, stock, redirect) => {
    // console.log("asdfsfads", typeof stock)
    if (Number(stock) === 0) {
      toast("Product not in stock");
    } else {
      if (redirect) {
        dispatch(addToCart(id, qty));
        history.push("/shopping-cart");
      } else {
        dispatch(addToCart(id, qty));
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);


  let reqMessage = "Request Product";
  const handleRequest = () => {
    if (!userInfo) {
      history.push("/signin-signup");
    } else {
      axios
        .post("/api/RequestStock", { reqMessage })
        .then((res) => toast(res.data.message));
    }
  };


  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <>
          {/* <Header /> */}
          <section className={classes.productDetailsSection}>
            <div className={`${classes.productDetailsWrapper} container`}>
              <div className={classes.productDetailsContent}>
                <div className={classes.productDetailsLeft}>
                  <div className={classes.productSlider}>
                    <div className={classes.productSliderOne}>
                      <Slider
                        asNavFor={nav2}
                        ref={(slider) => (slider1 = slider)}
                      >
                        {product?.files?.files?.map((image, idx) => (
                          <div key={idx}>
                            <img
                              src={
                                `${process.env.PUBLIC_URL}` +
                                `/uploads/${image?.filename}`
                              }
                              alt=""
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                    <div className={classes.productSliderTwo}>
                      <Slider
                        asNavFor={nav1}
                        ref={(slider) => (slider2 = slider)}
                        slidesToShow={4}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        arrows={false}
                      >
                        {product?.files?.files?.map((image, idx) => (
                          <div key={idx}>
                            <img src={`/uploads/${image.filename}`} alt="" />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
                <div className={classes.productDetailsRight}>
                  <div className={classes.productDetailsName}>
                    <h6>{product?.category}</h6>
                    <h3>{product?.productInfo?.title}</h3>
                  </div>
                  <div className={classes.productDetailsPrice}>
                    <h6>price</h6>
                    <div>
                      <h4>${product?.productInfo?.price} aud</h4>
                    </div>
                  </div>
                  <div className={classes.stockFiled}>
                    {Number(product?.productInfo?.countInStock) === 0 ? (
                      <div className={classes.outOfStock}>
                        <p>Out of Stock</p>
                        <div>
                          <button onClick={handleRequest}>
                            <i className="fas fa-inventory"></i> Request stock
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={classes.inStock}>
                        <p>In Stock</p>
                      </div>
                    )}
                  </div>
                  <div className={classes.productDetailsDescription}>
                    <h6>Description</h6>
                    <p>{product?.productInfo?.shortdescription}</p>
                  </div>
                  <div className={classes.buyAdd}>
                    <button
                      onClick={() =>
                        addToCartHandler(
                          1,
                          product?.productInfo?.countInStock,
                          "redirect"
                        )
                      }
                      className={classes.buyBtn}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() =>
                        addToCartHandler(1, product?.productInfo?.countInStock)
                      }
                      className={classes.addBtn}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className={classes.productDetailsShare}>
                    <h6>Share on:</h6>
                    <div className={classes.socialMediaShare}>
                      <FacebookShareButton url="https://www.facebook.com/">
                        <FacebookIcon size={32} round={true} />
                      </FacebookShareButton>
                      <TwitterShareButton
                        style={{ margin: "0 2rem" }}
                        url="https://www.twitter.com/"
                      >
                        <TwitterIcon size={32} round={true} />
                      </TwitterShareButton>
                      <LinkedinShareButton url="https://www.linkedin.com/">
                        <LinkedinIcon size={32} round={true} />
                      </LinkedinShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={classes.specificationAndReviewsSection}>
            <div
              className={`${classes.specificationAndReviewsWrapper} container`}
            >
              <ul className={classes.specificationReviews}>
                <li>
                  <Link to="/">specification</Link>
                </li>
              </ul>
              <div className={classes.specificationAndReviewsContent}>
                <div className={classes.specificationAndReviewsLeft}>
                  <ul className={classes.attributes}>
                    {product?.productInfo?.info?.name?.map((name, idx) => (
                      <li key={idx}>
                        <p>{name}:</p> <span>{values[idx]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
              </div>
              <p>{product?.productInfo?.longdescription}</p>
            </div>
          </section>
          {/* <SpecificationAndReviews product={product} /> */}
          {/* <RelatedProduct product={product} /> */}
          <StayInTouch />
          <Footer />
        </>
      )}
    </>
  );
};

export default ProductDetailsScreen;
