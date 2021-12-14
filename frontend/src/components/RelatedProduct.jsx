import React from "react";

import classes from "./RelatedProduct.module.css";

const RelatedProduct = () => {
  return (
    <section className={classes.relatedProductSection}>
      <div className={`${classes.relatedProductWrapper} container`}>
        <h3>Related Products</h3>
        <div className={classes.relatedProductContent}>
          <div className={classes.itemCard}>
            <div className={classes.card}>
              <div className={classes.imageCard}>
                <img src="/images/item1.png" alt="Item" />
                <div className={classes.itemOverlay}>
                  <div className={classes.addToCart}>
                    <img src="/icons/cart_light.png" alt="Cart" />
                    <p>ADD TO CART</p>
                  </div>
                  <h6>Buy Now</h6>
                </div>
              </div>
              <div className={classes.itemContainer}>
                <div className={classes.left}>
                  <h5>TACTICAL VEST</h5>
                  <p>250.00 $</p>
                </div>
                <div className={classes.right}>-20%</div>
              </div>
            </div>
            <div className={classes.card}>
              <div className={classes.imageCard}>
                <img src="/images/item2.png" alt="Item" />
                <div className={classes.itemOverlay}>
                  <div className={classes.addToCart}>
                    <img src="/icons/cart_light.png" alt="Cart" />
                    <p>ADD TO CART</p>
                  </div>
                  <h6>Buy Now</h6>
                </div>
              </div>
              <div className={classes.itemContainer}>
                <div className={classes.left}>
                  <h5>TACTICAL VEST</h5>
                  <p>250.00 $</p>
                </div>
                <div className={classes.right}>-20%</div>
              </div>
            </div>
            <div className={classes.card}>
              <div className={classes.imageCard}>
                <img src="/images/item3.png" alt="Item" />
                <div className={classes.itemOverlay}>
                  <div className={classes.addToCart}>
                    <img src="/icons/cart_light.png" alt="Cart" />
                    <p>ADD TO CART</p>
                  </div>
                  <h6>Buy Now</h6>
                </div>
              </div>
              <div className={classes.itemContainer}>
                <div className={classes.left}>
                  <h5>TACTICAL VEST</h5>
                  <p>250.00 $</p>
                </div>
                <div className={classes.right}>-20%</div>
              </div>
            </div>
            <div className={classes.card}>
              <div className={classes.imageCard}>
                <img src="/images/item4.png" alt="Item" />
                <div className={classes.itemOverlay}>
                  <div className={classes.addToCart}>
                    <img src="/icons/cart_light.png" alt="Cart" />
                    <p>ADD TO CART</p>
                  </div>
                  <h6>Buy Now</h6>
                </div>
              </div>
              <div className={classes.itemContainer}>
                <div className={classes.left}>
                  <h5>TACTICAL VEST</h5>
                  <p>250.00 $</p>
                </div>
                <div className={classes.right}>-20%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;
