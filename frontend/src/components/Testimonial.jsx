import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Testimonial.css";

const Testimonial = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
    <section className="testimonialSection">
      <div className="testimonialWrapper container">
        <h3>Testimonials</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
          illum mollitia omnis. Nostrum odit rem cupiditate tenetur deserunt
          maxime asperiores, incidunt accusamus quisquam, iste est.
        </p>
        <Slider {...settings}>
          <div className="testimonialContent">
            <div>
              <img src="/images/testimonial.jpg" alt="Testimonial" />
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Obcaecati maiores fugiat dignissimos perspiciatis perferendis
                nemo expedita aperiam”
              </p>
              <h4>John Doe 1</h4>
              <h6>Proffessional Hunter</h6>
            </div>
          </div>
          <div className="testimonialContent">
            <div>
              <img src="/images/testimonial.jpg" alt="Testimonial" />
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Obcaecati maiores fugiat dignissimos perspiciatis perferendis
                nemo expedita aperiam”
              </p>
              <h4>John Doe 2</h4>
              <h6>Proffessional Hunter</h6>
            </div>
          </div>
          <div className="testimonialContent">
            <div>
              <img src="/images/testimonial.jpg" alt="Testimonial" />
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Obcaecati maiores fugiat dignissimos perspiciatis perferendis
                nemo expedita aperiam”
              </p>
              <h4>John Doe 3</h4>
              <h6>Proffessional Hunter</h6>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
