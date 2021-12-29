import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import classes from "./PopularItems.module.css";

const PopularItems = () => {
  let itemsPerPage = 8;
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const { products } = useSelector((state) => state.productsReducer);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <section className={classes.popularItemSection}>
      <div className={`${classes.popularItemWrapper} container`}>
        <h3>MOST POPULAR ITEMS</h3>
        <p>
          View the items the are our biggest sellers
        </p>
        <div className={classes.popularItemContent}>
          <div className={classes.navItem}>
            <Link to="" className={classes.active}>
              ALL CATEGORIES
            </Link>
          </div>
        </div>
        <div className={classes.itemCard}>
          {currentItems?.map((product) => {
            return (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className={classes.card}
              >
                <div className={classes.imageCard}>
                  <img
                    src={`/uploads/${product?.files?.files[0]?.filename}`}
                    alt={product.name}
                  />
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
                    <h5>{product?.productInfo?.title}</h5>
                    <p>${product?.productInfo?.price}</p>
                  </div>
                  {/* <div className={classes.right}>{product.offer}%</div> */}
                </div>
              </Link>
            );
          })}
        </div>
        <ReactPaginate
          className={classes.reactPaginate}
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </section>
  );
};

export default PopularItems;
