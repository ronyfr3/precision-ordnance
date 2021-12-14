import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { addToCart } from "../actions/cartActions";
import Header from "../components/Header";
import StayInTouch from "../components/StayInTouch";
import Footer from "../components/Footer";
import "./CategoryScreen.css";

const BrandScreen = ({ match }) => {
  const [spinner, setSpinner] = useState(true);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsReducer);
  const brand = match.params.brand;
  const [brandArray, setBrandArray] = useState([]);
  React.useEffect(() => {
    setBrandArray(
      products.filter((product) => product.brand.trim().toLowerCase() === brand)
    );
  }, [brandArray]);

  const addToCartHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const settings = {
    dots: true,
    // arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const [val1, setVal1] = useState([]);
  const [val2, setVal2] = useState([]);
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const inStockCheck = () => {
    setClick(true);
    setClick1(false);
    setVal2(
      brandArray?.filter((x) => Number(x?.productInfo?.countInStock) > 0)
    );
  };
  const outOfStockCheck = () => {
    setClick(false);
    setClick1(true);
    setVal1(
      brandArray?.filter((x) => Number(x?.productInfo?.countInStock) === 0)
    );
  };
  console.log("outOfStockCheck", val1);
  console.log("inStockCheck", val2);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);
  return (
    <>
      {/* <Header /> */}
      <section
        className="productBannerSection"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/images/product_banner.png"
          })`,
        }}
      >
        <div className="productBannerWrapper container">
          <div className="productBannerContent">
            <div>
              <h1>{brand}</h1>
              <ul className="breadcrumb">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/all-products">All Category</Link>
                </li>
                <li>{brand}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="productSection">
        <div className="productWrapper container">
          <div className="productContent">
            <div className="totalSortItems">
              <div className="total">
                <p>
                  Total: <span>{brandArray.length} items</span>
                </p>
              </div>
              <div className="sortItemsForms"></div>
            </div>
            <div className="allProduct">
              <div className="productLeftContent">
                <form className="availabilityForm">
                  <h5>AVAILABILITY</h5>
                  <div>
                    <input
                      type="checkbox"
                      id="in-stock"
                      name=""
                      value=""
                      checked={click === true}
                      onClick={inStockCheck}
                    />
                    <label htmlFor="in-stock"> IN STOCK</label>
                    <br />
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="out-of-stock"
                      name=""
                      value=""
                      checked={click1 === true}
                      onClick={outOfStockCheck}
                    />
                    <label htmlFor="out-of-stock"> OUT OF STOCK</label>
                    <br />
                  </div>
                </form>
              </div>
              <div className="productRightContent">
                {/* instock */}
                {click === true ? (
                  <>
                    {val2?.map((c) => (
                      <div className="productAndReview">
                        <div className="productReviewStock">
                          <h3>{c?.productInfo?.title}</h3>
                          {/* <h5>Cal: 7.56MM</h5> */}
                          <p>$ {c.productInfo.price} AUD</p>
                          <div className="reviewStock">
                            <div className="stock">
                              {c?.countInStock === 0 ? (
                                <p style={{ color: "#F54748" }}>Out of Stock</p>
                              ) : (
                                <p>In stock</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => addToCartHandler(c._id, 1)}
                            className="btn"
                          >
                            Add to Cart
                          </button>
                        </div>
                        <div classNameName="productSlider">
                              <Slider {...settings}>
                                {c?.files?.files?.map((image) => {
                                  return (
                                    <div>
                                      <img
                                        src={
                                          `${process.env.PUBLIC_URL}` +
                                          `/uploads/${image?.filename}`
                                        }
                                        alt="Product"
                                      />
                                    </div>
                                  );
                                })}
                              </Slider>
                            </div>
                      </div>
                    ))}
                  </>
                ) : click1 === true ? (
                  <>
                    {val1?.map((c) => (
                      <div className="productAndReview">
                        <div className="productReviewStock">
                          <h3>{c?.productInfo?.title}</h3>
                          {/* <h5>Cal: 7.56MM</h5> */}
                          <p>$ {c.productInfo.price} AUD</p>
                          <div className="reviewStock">
                            <div className="stock">
                              {c?.countInStock === 0 ? (
                                <p style={{ color: "#F54748" }}>Out of Stock</p>
                              ) : (
                                <p>In stock</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => addToCartHandler(c._id, 1)}
                            className="btn"
                          >
                            Add to Cart
                          </button>
                        </div>
                        <div classNameName="productSlider">
                              <Slider {...settings}>
                                {c?.files?.files?.map((image) => {
                                  return (
                                    <div>
                                      <img
                                        src={
                                          `${process.env.PUBLIC_URL}` +
                                          `/uploads/${image?.filename}`
                                        }
                                        alt="Product"
                                      />
                                    </div>
                                  );
                                })}
                              </Slider>
                            </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {brandArray.length ? (
                      brandArray?.map((c, i) => {
                        return (
                          <div className="productAndReview">
                            <div className="productReviewStock">
                              <h5>{c?.productInfo?.title}</h5>
                              {/* <h5>Cal: 7.56MM</h5> */}
                              <p>$ {c?.productInfo?.price} AUD</p>
                              <div className="reviewStock">
                                <div className="stock">
                                  {c?.countInStock === 0 ? (
                                    <p style={{ color: "#F54748" }}>
                                      Out of Stock
                                    </p>
                                  ) : (
                                    <p>In stock</p>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => addToCartHandler(c._id, 1)}
                                className="btn"
                              >
                                Add to Cart
                              </button>
                            </div>
                            <div classNameName="productSlider">
                              <Slider {...settings}>
                                {c?.files?.files?.map((image) => {
                                  return (
                                    <div>
                                      <img
                                        src={
                                          `${process.env.PUBLIC_URL}` +
                                          `/uploads/${image?.filename}`
                                        }
                                        alt="Product"
                                      />
                                    </div>
                                  );
                                })}
                              </Slider>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No products found!</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <StayInTouch />
      <Footer />
    </>
  );
};

export default BrandScreen;
