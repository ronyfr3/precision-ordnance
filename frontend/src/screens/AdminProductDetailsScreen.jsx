import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Loader from '../components/Loader';
import classes from "./AdminProductDetailsScreen.module.css";

const AdminProductDetailsScreen = ({ match, history }) => {
  const [spinner, setSpinner] = useState(true);
  const { userInfo } = useSelector((state) => state.userSignin)
  let location = useLocation();
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/")
    }
    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }, [location]);
  const { products } = useSelector((state) => state.productsReducer);
  const singleProduct = products.filter(
    (product) => product._id === match.params.id
  );

  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.adminProductDetailsSection}>
          <AdminSidebar />
          <div className={classes.adminProductDetailsRight}>
            <AdminNavbar history={history} />
            <div className={classes.adminProductDetails}>
              <div>
                <h4>PRODUCT DETAILS</h4>
              </div>
              {/* <div> */}
              {/* <Link to="/admin/productcreate" className="btn addNewBtn">+ ADD NEW</Link> */}
              {/* </div> */}
            </div>
            <div className={classes.adminProductDetailsWithPictures}>
              <div className={classes.adminProductDetailsWrapper}>
                <div className={classes.adminProductDetailsLeft}>
                  <div className={classes.bigSingleImage}>
                    <img
                      src={
                        `${process.env.PUBLIC_URL}` +
                        `/uploads/${singleProduct[0]?.files?.files[0]?.filename}`
                      }
                      alt=""
                    />
                  </div>
                  <div className={classes.adminMultipleProductImage}>
                    {singleProduct[0]?.files?.files?.map((image) => (
                      <div>
                        <img src={`/uploads/${image.filename}`} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classes.adminProductDetailsRight}>
                  <div className={classes.adminProductDetailsHead}>
                    <div className={classes.leftHead}>
                      <h5>PRODUCT NAME:</h5>
                    </div>
                    <div>
                      <Link
                        to={`/admin/productupdate/${match.params.id}`}
                        className={classes.editBtn}
                      >
                        EDIT INFO
                      </Link>
                    </div>
                  </div>
                  <div className={classes.productName}>
                    <h3>{singleProduct[0]?.productInfo?.title}</h3>
                  </div>
                  <div className={classes.productInfo}>
                    <div className={classes.headProductInfo}>
                      <h5>PRODUCT INFO</h5>
                    </div>
                    <ul>
                      <li>
                        <span>Category:</span>{" "}
                        <span>{singleProduct[0]?.category}</span>
                      </li>
                      <li>
                        <span>Sub-category:</span>{" "}
                        <span>{singleProduct[0]?.subcategory}</span>
                      </li>
                      <li>
                        <span>Brand:</span>{" "}
                        <span>{singleProduct[0]?.brand}</span>
                      </li>
                    </ul>
                    <div className={classes.productInfoDescription}>
                      <h5>Description:</h5>
                      <p>{singleProduct[0]?.productInfo?.shortdescription}</p>
                    </div>
                  </div>
                  <div className={classes.salesInfo}>
                    <div className={classes.headSalesInfo}>
                      <h5>SALES INFO</h5>
                    </div>
                    <ul>
                      <li>
                        <span>Price:</span>{" "}
                        <span>${singleProduct[0]?.productInfo?.price} AUD</span>
                      </li>
                      <li>
                        <span>Availability:</span>{" "}
                        {singleProduct[0]?.productInfo?.countInStock == 0 ? (
                          <span>Out of Stock</span>
                        ) : (
                          <span>In Stock</span>
                        )}
                      </li>
                      <li>
                        <span>Amount:</span>{" "}
                        <span>
                          {singleProduct[0]?.productInfo?.countInStock} pcs
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className={classes.specification}>
                    <div className={classes.headSpecification}>
                      <h5>SPECIFICATION</h5>
                    </div>
                    <div className={classes.specificationLists}>
                      <ul>
                        {singleProduct[0]?.productInfo?.info?.name?.map(
                          (name) => (
                            <li>{name}</li>
                          )
                        )}
                      </ul>
                      <ul>
                        {singleProduct[0]?.productInfo?.info?.values1?.map(
                          (value) => (
                            <li>{value}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className={classes.blabla}>
                    <p>{singleProduct[0]?.productInfo?.longdescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminProductDetailsScreen;
