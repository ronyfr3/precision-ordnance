import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { addToCart } from "../actions/cartActions"
import Footer from "../components/Footer"
// import Header from "../components/Header";
import StayInTouch from "../components/StayInTouch"
import "./CategoryScreen.css"

const BrandScreen = ({ match }) => {
  const [spinner, setSpinner] = useState(true)
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.productsReducer)
  const brand = match.params.brand
  // const [brandArray, setBrandArray] = useState([]);
  // React.useEffect(() => {
  //   setBrandArray(
  //     products.filter((product) => product.brand.trim().toLowerCase() === brand)
  //   );
  // }, [brandArray, brand, products]);

  const brandArray = products?.filter(
    (product) => product?.brand?.trim()?.toLowerCase() === brand
  )

  const addToCartHandler = (id, qty, stock) => {
    console.log("31", typeof stock)
    if (stock === 0) {
      toast("Product not in stock")
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
  }
  const [val1, setVal1] = useState([])
  const [val2, setVal2] = useState([])
  const [click, setClick] = useState(false)
  const [click1, setClick1] = useState(false)
  const inStockCheck = () => {
    setClick(!click)
    setClick1(false)
    setVal2(brandArray?.filter((x) => Number(x?.productInfo?.countInStock) > 0))
  }
  const outOfStockCheck = () => {
    setClick1(!click1)
    setClick(false)
    setVal1(
      brandArray?.filter((x) => Number(x?.productInfo?.countInStock) === 0)
    )
  }

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500)
  }, [])
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
          <ToastContainer />
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
              <div className="sortItemsForms">
                <form className="sortAvailableForm">
                  {/* <h5>AVAILABILITY</h5> */}
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
                    {val2?.map((c, idx) => (
                      <div key={idx} className="productAndReview">
                        <div className="productReviewStock">
                          <h5>{c?.productInfo?.title}</h5>
                          {/* <h5>Cal: 7.56MM</h5> */}
                          <p>$ {c.productInfo.price} AUD</p>
                          <div className="reviewStock">
                            <div className="stock">
                              {Number(c?.productInfo?.countInStock) === 0 ? (
                                <p style={{ color: "#F54748" }}>Out of Stock</p>
                              ) : (
                                <p>In stock</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => addToCartHandler(c._id, 1, Number(c?.productInfo?.countInStock))}
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
                              )
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
                          <h5>{c?.productInfo?.title}</h5>
                          {/* <h5>Cal: 7.56MM</h5> */}
                          <p>$ {c.productInfo.price} AUD</p>
                          <div className="reviewStock">
                            <div className="stock">
                              {Number(c?.productInfo?.countInStock) === 0 ? (
                                <p style={{ color: "#F54748" }}>Out of Stock</p>
                              ) : (
                                <p>In stock</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => addToCartHandler(c._id, 1, Number(c?.productInfo?.countInStock))}
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
                              )
                            })}
                          </Slider>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {brandArray.length ? (
                      brandArray?.map((c, idx) => {
                        return (
                          <div key={idx} className="productAndReview">
                            <div className="productReviewStock">
                              <h5>{c?.productInfo?.title}</h5>
                              {/* <h5>Cal: 7.56MM</h5> */}
                              <p>$ {c?.productInfo?.price} AUD</p>
                              <div className="reviewStock">
                                <div className="stock">
                                  {Number(c?.productInfo?.countInStock) ? (
                                    <p style={{ color: "#F54748" }}>
                                      Out of Stock
                                    </p>
                                  ) : (
                                    <p>In stock</p>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => addToCartHandler(c._id, 1, Number(c?.productInfo?.countInStock))}
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
                                  )
                                })}
                              </Slider>
                            </div>
                          </div>
                        )
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
  )
}

export default BrandScreen
