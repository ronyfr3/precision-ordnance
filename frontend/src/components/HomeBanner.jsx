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
            <img src="/images/slider5.jpg" alt="image" />
            <div className="banner">
              <h3>Built for Precision</h3>
              <h1>Designed for Hunting</h1>
              <p>
                Take your marksmanship to the next level with ultra-light,
                strongly built rifle with a swagger look- lock & loaded for your
                next hunt.
              </p>
              <div>
                <Link to="/all-products" className="btn">
                  <span>shop now</span>{" "}
                  <i className="fas fa-long-arrow-alt-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="homeBanner">
            <img src="/images/slider2.jpg" alt="image" />
            <div className="banner">
              <h3>Built for Precision</h3>
              <h1>Designed for Hunting</h1>
              <p>
                Take your marksmanship to the next level with ultra-light,
                strongly built rifle with a swagger look- lock & loaded for your
                next hunt.
              </p>
              <div>
                <Link to="/all-products" className="btn">
                  <span>shop now</span>{" "}
                  <i className="fas fa-long-arrow-alt-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="homeBanner">
            <img src="/images/slider3.jpg" alt="image" />
            <div className="banner">
              <h3>Built for Precision</h3>
              <h1>Designed for Hunting</h1>
              <p>
                Take your marksmanship to the next level with ultra-light,
                strongly built rifle with a swagger look- lock & loaded for your
                next hunt.
              </p>
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
