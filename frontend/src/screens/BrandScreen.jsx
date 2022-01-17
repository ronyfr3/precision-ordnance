import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { addToCart } from "../actions/cartActions";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import StayInTouch from "../components/StayInTouch";
import Loader from "../components/Loader";
import "./CategoryScreen.css";

const BrandScreen = ({ match }) => {
  const [spinner, setSpinner] = useState(true);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsReducer);
  const brand = match.params.brand;

  const brandArray = products?.filter(
    (product) => product?.brand?.trim()?.toLowerCase() === brand
  );

  const addToCartHandler = (id, qty, stock) => {
    if (stock === 0) {
      toast("Product not in stock");
    } else {
      dispatch(addToCart(id, qty));
    }
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
    setClick(!click);
    // setClick(true);
    setClick1(false);
    setVal2(
      brandArray?.filter((x) => Number(x?.productInfo?.countInStock) > 0)
    );
  };
  const outOfStockCheck = () => {
    setClick1(!click1);
    setClick(false);
    // setClick1(true);
    setVal1(
      brandArray?.filter((x) => Number(x?.productInfo?.countInStock) === 0)
    );
  };

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);

  const data = [
    {
      id: "1",
      tabTitle: (
        <button className="tabItem">
          <i className="fas fa-list"></i>
        </button>
      ),
      tabContent: (
        <>
          {spinner ? (
            <Loader />
          ) : (
            <>
              <section className="productSection">
                <div className="productWrapper container">
                  <div className="productContent">
                    {/* <div className="totalSortItems">
                      <div className="total">
                        <p>
                          Total: <span>{brandArray?.length} items</span>
                        </p>
                      </div>

                      <div className="sortItemsForms"></div>
                    </div> */}
                    <div className="allProduct">
                      <div className="productLeftContent">
                        <form className="availabilityForm">
                          <h5>AVAILABILITY</h5>
                          <div>
                            <input
                              type="checkbox"
                              id="in-stock"
                              name="checkValue"
                              value=""
                              checked={click}
                              onClick={inStockCheck}
                            />
                            <label htmlFor="in-stock"> IN STOCK</label>
                            <br />
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="out-of-stock"
                              name="checkValue"
                              value=""
                              checked={click1}
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
                            {val2?.map((c, idx) => (
                              <div key={idx} className="productAndReview">
                                <div className="productReviewStock">
                                  <h5>{c?.category}</h5>
                                  <h4>{c?.productInfo?.title}</h4>
                                  <h5>$ {c.productInfo.price} AUD</h5>
                                  <div className="reviewStock">
                                    <div className="stock">
                                      {Number(c?.productInfo?.countInStock) ===
                                      0 ? (
                                        <p style={{ color: "#F54748" }}>
                                          Out of Stock
                                        </p>
                                      ) : (
                                        <p>In stock</p>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      addToCartHandler(
                                        c._id,
                                        1,
                                        Number(c?.productInfo?.countInStock)
                                      )
                                    }
                                    className="btn"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                                <div className="productSlider">
                                  <Slider {...settings}>
                                    {c?.files?.files?.map((image, idx) => {
                                      return (
                                        <div key={idx}>
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
                            {val1?.map((c, idx) => (
                              <div key={idx} className="productAndReview">
                                <div className="productReviewStock">
                                  <h5>{c?.category}</h5>
                                  <h4>{c?.productInfo?.title}</h4>
                                  <h5>$ {c.productInfo.price} AUD</h5>
                                  <div className="reviewStock">
                                    <div className="stock">
                                      {Number(c?.productInfo?.countInStock) ===
                                      0 ? (
                                        <p style={{ color: "#F54748" }}>
                                          Out of Stock
                                        </p>
                                      ) : (
                                        <p>In stock</p>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      addToCartHandler(
                                        c._id,
                                        1,
                                        Number(c?.productInfo?.countInStock)
                                      )
                                    }
                                    className="btn"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                                <div className="productSlider">
                                  <Slider {...settings}>
                                    {c?.files?.files?.map((image, idx) => {
                                      return (
                                        <div key={idx}>
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
                            {brandArray?.map((c, idx) => {
                              return (
                                <div key={idx} className="productAndReview">
                                  <div className="productReviewStock">
                                    <h5>{c?.category}</h5>
                                    <h4>{c?.productInfo?.title}</h4>
                                    <h5>$ {c?.productInfo?.price} AUD</h5>
                                    <div className="reviewStock">
                                      <div className="stock">
                                        {Number(
                                          c?.productInfo?.countInStock
                                        ) === 0 ? (
                                          <p style={{ color: "#F54748" }}>
                                            Out of Stock
                                          </p>
                                        ) : (
                                          <p>In stock</p>
                                        )}
                                      </div>
                                    </div>
                                    <button
                                      onClick={() =>
                                        addToCartHandler(
                                          c._id,
                                          1,
                                          Number(c?.productInfo?.countInStock)
                                        )
                                      }
                                      className="btn"
                                    >
                                      Add to Cart
                                    </button>
                                  </div>
                                  <div className="productSlider">
                                    <Slider {...settings}>
                                      {c?.files?.files?.map((image, idx) => {
                                        return (
                                          <div key={idx}>
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
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      ),
    },
    {
      id: "2",
      tabTitle: (
        <button className="tabItem">
          <i className="fas fa-th-large"></i>
        </button>
      ),
      tabContent: (
        <>
          {spinner ? (
            <Loader />
          ) : (
            <>
              <section className="productSection">
                <div className="productWrapper container">
                  <div className="productContent">
                    <div className="allProduct">
                      <div className="productLeftContent">
                        <form className="availabilityForm">
                          <h5>AVAILABILITY</h5>
                          <div>
                            <input
                              type="checkbox"
                              id="in-stock"
                              name="checkValue"
                              value=""
                              checked={click}
                              onClick={inStockCheck}
                            />
                            <label htmlFor="in-stock"> IN STOCK</label>
                            <br />
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="out-of-stock"
                              name="checkValue"
                              value=""
                              checked={click1}
                              onClick={outOfStockCheck}
                            />
                            <label htmlFor="out-of-stock"> OUT OF STOCK</label>
                            <br />
                          </div>
                        </form>
                      </div>
                      <div className="productRightContentGrid">
                        {/* instock */}
                        {click === true ? (
                          <>
                            {val2?.map((c, idx) => (
                              <div key={idx} className="productAndReviewGrid">
                                <div className="productSliderGrid">
                                  <Slider {...settings}>
                                    {c?.files?.files?.map((image, idx) => {
                                      return (
                                        <div key={idx}>
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
                                <div className="productReviewStockGrid">
                                  <div className="productAttribute">
                                    <h6>{c?.category}</h6>
                                    <h5>{c?.productInfo?.title}</h5>
                                    <h6>$ {c?.productInfo?.price} AUD</h6>
                                  </div>
                                  <div className="reviewAndButtonGrid">
                                    <button
                                      onClick={() =>
                                        addToCartHandler(
                                          c._id,
                                          1,
                                          Number(c?.productInfo?.countInStock)
                                        )
                                      }
                                      className="btn"
                                    >
                                      Add to Cart
                                    </button>
                                    <div className="reviewStock">
                                      <div className="stock">
                                        {Number(
                                          c?.productInfo?.countInStock
                                        ) === 0 ? (
                                          <p style={{ color: "#F54748" }}>
                                            Out of Stock
                                          </p>
                                        ) : (
                                          <p>In stock</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : click1 === true ? (
                          <>
                            {val1?.map((c, idx) => (
                              <div key={idx} className="productAndReviewGrid">
                                <div className="productSliderGrid">
                                  <Slider {...settings}>
                                    {c?.files?.files?.map((image, idx) => {
                                      return (
                                        <div key={idx}>
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
                                <div className="productReviewStockGrid">
                                  <div className="productAttribute">
                                    <h6>{c?.category}</h6>
                                    <h5>{c?.productInfo?.title}</h5>
                                    <h6>$ {c?.productInfo?.price} AUD</h6>
                                  </div>
                                  <div className="reviewAndButtonGrid">
                                    <button
                                      onClick={() =>
                                        addToCartHandler(
                                          c._id,
                                          1,
                                          Number(c?.productInfo?.countInStock)
                                        )
                                      }
                                      className="btn"
                                    >
                                      Add to Cart
                                    </button>
                                    <div className="reviewStock">
                                      <div className="stock">
                                        {Number(
                                          c?.productInfo?.countInStock
                                        ) === 0 ? (
                                          <p style={{ color: "#F54748" }}>
                                            Out of Stock
                                          </p>
                                        ) : (
                                          <p>In stock</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            {brandArray?.map((c, idx) => {
                              return (
                                <div key={idx} className="productAndReviewGrid">
                                  <div className="productSliderGrid">
                                    <Slider {...settings}>
                                      {c?.files?.files?.map((image, idx) => {
                                        return (
                                          <div key={idx}>
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
                                  <div className="productReviewStockGrid">
                                    <div className="productAttribute">
                                      <h6>{c?.category}</h6>
                                      <h5>{c?.productInfo?.title}</h5>
                                      <h6>$ {c?.productInfo?.price} AUD</h6>
                                    </div>
                                    <div className="reviewAndButtonGrid">
                                      <button
                                        onClick={() =>
                                          addToCartHandler(
                                            c._id,
                                            1,
                                            Number(c?.productInfo?.countInStock)
                                          )
                                        }
                                        className="btn"
                                      >
                                        Add to Cart
                                      </button>
                                      <div className="reviewStock">
                                        <div className="stock">
                                          {Number(
                                            c?.productInfo?.countInStock
                                          ) === 0 ? (
                                            <p style={{ color: "#F54748" }}>
                                              Out of Stock
                                            </p>
                                          ) : (
                                            <p>In stock</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      ),
    },
  ];

  const [visibleTab, setVisibleTab] = React.useState(data[0].id);

  const listTitles = data?.map((item) => (
    <li
      onClick={() => setVisibleTab(item.id)}
      key={item.id}
      className={
        visibleTab === item.id ? "tab-title tab-title--active" : "tab-title"
      }
    >
      {item.tabTitle}
    </li>
  ));

  const listContent = data.map((item) => (
    <div
      key={item.id}
      style={visibleTab === item.id ? {} : { display: "none" }}
    >
      {item.tabContent}
    </div>
  ));

  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
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
                      Total: <span>{brandArray?.length} items</span>
                    </p>
                  </div>
                  <div className="sortItemsForms">
                    <form className="sortForm">
                      <div>
                        <input
                          type="checkbox"
                          id="in-stock"
                          name="checkValue"
                          value=""
                          checked={click}
                          onClick={inStockCheck}
                        />
                        <label htmlFor="in-stock"> IN STOCK</label>
                        <br />
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="out-of-stock"
                          name="checkValue"
                          value=""
                          checked={click1}
                          onClick={outOfStockCheck}
                        />
                        <label htmlFor="out-of-stock"> OUT OF STOCK</label>
                        <br />
                      </div>
                    </form>
                  </div>
                  <ul className="listTitles">{listTitles}</ul>
                </div>
                {listContent}
              </div>
            </div>
          </section>
          <StayInTouch />
          <Footer />
        </>
      )}
    </>
  );
};

export default BrandScreen;
