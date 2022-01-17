import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { addToCart } from "../actions/cartActions";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./SearchProductScreen.css";

const SearchProductScreen = ({match}) => {
  const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.productsReducer);

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
  //   console.log(searchProduct?.files?.files?.map(x=>x))
  let { queryProducts } = useSelector((state) => state.QueryProducts);

  console.log("queryProducts", queryProducts);

  return (
    <section className="searchProductSection">
      <div className="searchProductWrapper container">
      <h6>Search result for: <span>{match.params.search}</span></h6>
        {/* QueryProduct */}
        <div className="productRightContentGridSearch">
          {queryProducts?.map((c, idx) => {
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
                        {Number(c?.productInfo?.countInStock) === 0 ? (
                          <p style={{ color: "#F54748" }}>Out of Stock</p>
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
        </div>
      </div>
    </section>
  );
};

export default SearchProductScreen;
