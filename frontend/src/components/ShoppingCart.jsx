import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import classes from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const qtyIncrementHandler = (id, qty) => {
    dispatch(addToCart(id, qty + 1));
  };

  const qtyDecrementHandler = (id, qty) => {
    if (qty > 1) {
      dispatch(addToCart(id, qty - 1));
    }
  };
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  // const tax =
  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);

  // const cartTotalPrice = totalPrice - totalItems
  return (
    <section className={classes.shoppingCartSection}>
      <div className={`${classes.shoppingCartWrapper} container`}>
        <div className={classes.shoppingCartLeft}>
          <div className={classes.productAttributes}>
            <h5>Product</h5>
            <h5>Price</h5>
            <h5>Qty.</h5>
            <h5>Total</h5>
            {/* <h5></h5> */}
          </div>
          <div className={classes.cartItems}>
            {cartItems?.map((item) => {
              return (
                <div key={item.product} className={classes.detailsCartItem}>
                  <div className={classes.productCart}>
                    <img
                      src={
                        `${process.env.PUBLIC_URL}` +
                        `/uploads/${item?.image?.[0]?.filename}`
                      }
                      alt=""
                    />
                    <div className={classes.detailsProductName}>
                      <h4>{item?.title}</h4>
                      {/* <p>Cal: {item.description}</p>
                    <p>Color: Black</p> */}
                    </div>
                  </div>
                  <div className={classes.priceCart}>
                    <p>$ {item?.price} Aud</p>
                  </div>
                  <div className={classes.quantityCart}>
                    <button
                      onClick={() =>
                        qtyDecrementHandler(item.product, item.qty)
                      }
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() =>
                        qtyIncrementHandler(item.product, item.qty)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className={classes.totalCart}>
                    <p>$ {item.price} AUD</p>
                  </div>
                  <button
                    onClick={() => removeCartHandler(item.product)}
                    className={classes.deleteCart}
                  >
                    <img src="/icons/close.png" alt="Close" />
                  </button>
                </div>
              );
            })}
            <div className={classes.cartSubtotal}>
              <div className={classes.subtotal}>
                <p>SUBTOTAL</p>
              </div>
              <div className={classes.subtotalAmount}>
                <p>${totalPrice} AUD</p>
              </div>
            </div>
            <div className={classes.shoppingCartButtons}>
              {/* <Link to='/checkout' className={`btn ${classes.paymentBtn}`}>
                GO TO PAYMENT
              </Link> */}
              <Link to="/checkout" className={`btn ${classes.continueBtn}`}>
                Checkout
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.shoppingCartRight}>
          <h4>Summary</h4>
          <ul>
            <li>
              <p>Items</p>
              <span>{totalItems}</span>
            </li>
            <li>
              <p>Subtotal</p>
              <span>{totalPrice} aud</span>
            </li>
            {/* <li>
              <p>Shipping</p>
              <span>200.00 aud</span>
            </li>
            <li>
              <p>Tax(25%)</p>
              <span>350.00 aud</span>
            </li>
            <li>
              <p>Discount</p>
              <span>-150.00 aud</span>
            </li> */}
            <li>
              <p>Total</p>
              <span>{totalPrice} aud</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
