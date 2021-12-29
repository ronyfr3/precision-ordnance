import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { addToCart } from "../actions/cartActions";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./SearchProductScreen.css";

const SearchProductScreen = () => {
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
  let values = queryProducts.filter((x) => x.data.length > 0);
  let [data] = values;
  // console.log("queryProducts", data?.data);

  return (
    <section className="searchProductSection">
      <div className="searchProductWrapper container">
        {/* QueryProduct */}
        {data?.data?.map((x, idx) => {
          return (
            <div key={idx} className="searchAllProduct">
              <div className="searchSliderDetails">
                <div className="searchDetails">
                  <h4>{x.productInfo?.title}</h4>
                  <h6>Category: {x?.category}</h6>
                  <h6 className="brand">Brand: {x?.brand}</h6>
                  <p className="price">$ {x?.productInfo?.price}</p>
                  <button
                    onClick={() => addToCartHandler(x._id, 1)}
                    className="cartBtn"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="searchSlider">
                  <Slider {...settings}>
                    {x?.files?.files?.map((x, idx) => {
                      return <img key={idx} className="sliderImage" src={`/uploads/${x.filename}`} alt="" />;
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SearchProductScreen;
