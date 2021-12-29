import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./HomeBanner.css";

const HomeBanner = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <section className="homeBannerSection">
      <div className="homeBannerWrapper">
        <Slider {...settings}>
          <div className="homeBanner">
            <img src="/images/slider5.jpg" alt="" />
            <div className="banner">
              <h3>Highest Quality Workmanship and Components</h3>
              <div>
                <Link to="/all-products" className="btn">
                  <span>shop now</span>{" "}
                  <i className="fas fa-long-arrow-alt-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="homeBanner">
            <img src="/images/slider2.jpg" alt="" />
            <div className="banner">
              <h3>Accurate, Consistant and Reliable</h3>
              <div>
                <Link to="/all-products" className="btn">
                  <span>shop now</span>{" "}
                  <i className="fas fa-long-arrow-alt-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="homeBanner">
            <img src="/images/slider3.jpg" alt="" />
            <div className="banner">
              <h3>When only the best will do</h3>
              <div>
                <Link to="/all-products" className="btn">
                  <span>shop now</span>{" "}
                  <i className="fas fa-long-arrow-alt-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default HomeBanner;
