import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import Swiper from 'swiper';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import classes from "./Product.module.css";

const Product = ({ history, match }) => {
  let slider1;
  let slider2;
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const { products } = useSelector((state) => state.productsReducer);
  const { id } = useParams();

  const singleProduct = products.filter((p) => p._id === id);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);
  return (
    <>
      <section className={classes.productDetailsSection}>
        <div className={`${classes.productDetailsWrapper} container`}>
          <div className={classes.productDetailsContent}>
            <div className={classes.productDetailsLeft}>
              <div>
                <h2>Slider Syncing (AsNavFor)</h2>
                <h4>First Slider</h4>
                <Slider asNavFor={nav2} ref={(slider) => (slider1 = slider)}>
                  <div>
                    <h3>1</h3>
                  </div>
                  <div>
                    <h3>2</h3>
                  </div>
                  <div>
                    <h3>3</h3>
                  </div>
                  <div>
                    <h3>4</h3>
                  </div>
                  <div>
                    <h3>5</h3>
                  </div>
                  <div>
                    <h3>6</h3>
                  </div>
                </Slider>
                <h4>Second Slider</h4>
                <Slider
                  asNavFor={nav1}
                  ref={(slider) => (slider2 = slider)}
                  slidesToShow={3}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  arrows={false}
                >
                  <div>
                    <h3>1</h3>
                  </div>
                  <div>
                    <h3>2</h3>
                  </div>
                  <div>
                    <h3>3</h3>
                  </div>
                  <div>
                    <h3>4</h3>
                  </div>
                  <div>
                    <h3>5</h3>
                  </div>
                  <div>
                    <h3>6</h3>
                  </div>
                </Slider>
              </div>
            </div>
            <div className={classes.productDetailsRight}>
              <div className={classes.productDetailsName}>
                <h6>{singleProduct.category}</h6>
                <h1>{singleProduct.name}</h1>
                <h5>CalA: 7.56MM</h5>
              </div>
              <div className={classes.productDetailsPrice}>
                <h6>price</h6>
                <div>
                  <h4>$3298423 aud</h4>
                  <h6>$92348923 aud</h6>
                  <span> -15% </span>
                </div>
              </div>
              <div className={classes.productDetailsStock}>
                <h6>In Stock</h6>
                <div>
                  <h5>4.5/5</h5>
                  <div className={classes.review}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <Link to="/">See reviews</Link>
                </div>
              </div>
              <div className={classes.productDetailsDescription}>
                <h6>Description</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
                  error. Magnam maxime quidem voluptatem esse reprehenderit
                  adipisci. Velit autem dolorum voluptatibus totam eligendi?
                  Incidunt explicabo ab impedit facere repellendus debitis saepe
                  quia ducimus quos suscipit?
                </p>
              </div>
              <div className={classes.buyAdd}>
                <button className="btn">Buy Now</button>
                <button className={`btn ${classes.add}`}>Add to Cart</button>
              </div>
              <div className={classes.productDetailsShare}>
                <h6>Share on:</h6>
                <div className={classes.socialMediaShare}>
                  <Link to="/">
                    <i className="fab fa-facebook"></i>
                  </Link>
                  <Link to="/">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link to="/">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                  <Link to="/">
                    <i className="fab fa-twitter"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={classes.specificationAndReviewsSection}>
        <div className={`${classes.specificationAndReviewsWrapper} container`}>
          <ul className={classes.specificationReviews}>
            <li>
              <Link to="/">specification</Link>
            </li>
            <li>
              <Link to="/">reviews</Link>
            </li>
          </ul>
          <div className={classes.specificationAndReviewsContent}>
            <div className={classes.specificationAndReviewsLeft}>
              <ul className={classes.attributes}>
                <li>
                  <p>Type:</p>
                  <span>Rifle</span>
                </li>
                <li>
                  <p>Name:</p>
                  {/* <span>{product.name}</span> */}
                </li>
                <li>
                  <p>Firing Mode:</p>
                  <span>Single, Burst</span>
                </li>
                <li>
                  <p>Calliber:</p>
                  <span>7.56 mm</span>
                </li>
                <li>
                  <p>Weight:</p>
                  <span>1200 gm</span>
                </li>
                <li>
                  <p>Width:</p>
                  <span>1000 cm</span>
                </li>
                <li>
                  <p>Height:</p>
                  <span>30 cm</span>
                </li>
                <li>
                  <p>Price:</p>
                  <span>12,000 aud</span>
                </li>
                <li>
                  <p>Body Impact:</p>
                  <span>10,000</span>
                </li>
                <li>
                  <p>Method:</p>
                  <span>Magazine</span>
                </li>
              </ul>
            </div>
            <div className={classes.specificationAndReviewsRight}>
              <img src="/images/product_video.png" alt="Product Video" />
            </div>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            mollitia velit, officiis architecto quia iusto totam, illum minus
            nisi odit saepe praesentium eum est provident! Totam modi alias
            eaque dolore laborum inventore magnam, asperiores quibusdam autem
            nemo tenetur, quos et mollitia sunt ipsum est ratione dicta! Unde
            quaerat esse ut! nisi odit saepe praesentium eum est provident!
            Totam modi alias eaque dolore laborum inventore magnam, asperiores
            quibusdam autem nemo tenetur, quos et mollitia sunt ipsum est
            ratione dicta! Unde quaerat esse ut!
          </p>
          <ul className={classes.details}>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              vel!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              vel!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              vel!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              vel!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              vel!
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Product;
