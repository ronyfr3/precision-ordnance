import React from "react";

import classes from "./OurStory.module.css";

const OurStory = () => {
  return (
    <section
      className={classes.ourStorySection}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
          process.env.PUBLIC_URL + "/images/slider4.jpg"
        })`,
      }}
    >
      <div className={`${classes.ourStoryWrapper} container`}>
        <div className={classes.ourStoryContent}>
          <div>
            <h3>Our Story</h3>
            <h1>We had come a long way</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              deserunt fuga totam quia voluptatem id accusamus quidem est
              quisquam enim sapiente velit maxime cumque vel voluptatibus
              commodi, dolore nesciunt similique.
            </p>
            <div className={classes.learn}>
              <button className="btn">
                Learn More <i className="fas fa-long-arrow-alt-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
