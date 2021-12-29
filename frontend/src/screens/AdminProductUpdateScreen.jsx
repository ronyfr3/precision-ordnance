// import './ProductCreateScreen.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productsAction";
import "./AdminProductCreateScreen.css";

const AdminProductUpdateScreen = ({ match, history }) => {
  const [spinner, setSpinner] = useState(true);
  const { userInfo } = useSelector((state) => state.userSignin);
  const { product: singleProduct } = useSelector(
    (state) => state.productDetails
  );

  console.log("18", singleProduct);

  let location = useLocation();

  const dispatch = useDispatch();

  const id = match.params.id;

  const [tags1, setTags1] = useState([]);
  const [tags2, setTags2] = useState([]);
  const [tags3, setTags3] = useState([]);
  // new arrival
  const [newarrival, setNewarrival] = useState(false);

  const [product, setProduct] = useState({
    category: "",
    subcategory: "",
    brand: "",
    title: "",
    price: "",
    shortdescription: "",
    longdescription: "",
    countinstock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  //newarrival
  const handleArrival = () => {
    setNewarrival(!newarrival);
  };
  //file upload
  const [files, setFiles] = useState([]);

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  let tagInput1;
  let tagInput2;
  let tagInput3;
  const removeTag1 = (i) => {
    const newTags = [...tags1];
    newTags.splice(i, 1);
    // Call the defined function setTags which will replace tags with the new value.
    setTags1(newTags);
  };
  const removeTag2 = (i) => {
    const newTags = [...tags2];
    newTags.splice(i, 1);
    // Call the defined function setTags which will replace tags with the new value.
    setTags2(newTags);
  };
  const removeTag3 = (i) => {
    const newTags = [...tags3];
    newTags.splice(i, 1);
    // Call the defined function setTags which will replace tags with the new value.
    setTags3(newTags);
  };

  const inputKeyDown1 = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      e.preventDefault();
      if (tags1.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags1([...tags1, val]);
      tagInput1.value = null;
    } else if (e.key === "Backspace" && !val) {
      removeTag1(tags1.length - 1);
    }
  };
  const inputKeyDown2 = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      e.preventDefault();
      if (tags2.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags2([...tags2, val]);
      tagInput2.value = null;
    } else if (e.key === "Backspace" && !val) {
      removeTag2(tags2.length - 1);
    }
  };
  const inputKeyDown3 = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      e.preventDefault();
      if (tags3.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags3([...tags3, val]);
      tagInput3.value = null;
    } else if (e.key === "Backspace" && !val) {
      removeTag3(tags3.length - 1);
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      if (!singleProduct?.productInfo?.title || singleProduct._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setProduct({
          category: singleProduct?.category,
          subcategory: singleProduct?.subcategory,
          brand: singleProduct?.brand,
          title: singleProduct?.productInfo?.title,
          price: singleProduct?.productInfo?.price,
          shortdescription: singleProduct?.productInfo?.shortdescription,
          longdescription: singleProduct?.productInfo?.longdescription,
          longdescription: singleProduct?.productInfo?.longdescription,
          countinstock: singleProduct?.productInfo?.countInStock,
        });
      }
    }

    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }, [location, history, userInfo]);

  //upload id
  const [uploadData, setUploadData] = useState();
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append("uploadImages", file);
    });

    try {
      const res = await axios.post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadData(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const productObj = {
    user: "61765a978ad5752627b851b5",
    files: uploadData,
    category: product.category,
    subcategory: product.subcategory,
    brand: product.brand,
    newArrival: newarrival,
    productInfo: {
      info: {
        name: tags1,
        values1: tags2,
        values2: tags3,
      },
      title: product.title,
      price: product.price,
      shortdescription: product.shortdescription,
      longdescription: product.longdescription,
      countInStock: product.countinstock
    },
  };

  console.log("197", productObj)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/products/${id}`, productObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      toast(res.data.message);
      setProduct({
        category: "",
        subcategory: "",
        brand: "",
        title: "",
        price: "",
        shortdescription: "",
        longdescription: "",
        countinstock: "",
      });
      setTags1([]);
      setTags2([]);
      setTags3([]);
      setNewarrival(false);
      setFiles([]);
      console.log("product", res.data);
      setTimeout(() => {
        window.location.reload(true);
      }, 300);
      history.push("/admin/productlist")
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className="productCreateScreen">
          <AdminSidebar />
          <div className="productCreateRight">
            <AdminNavbar history={history} />
            <div className="addProduct">
              <div>
                <h4>Update Product</h4>
              </div>
            </div>
            <ToastContainer />
            <form className="productCreateForm">
              <h6>Product info</h6>
              <p>Product name</p>
              <input
                name="title"
                value={product.title}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <p>Category</p>
              <input
                name="category"
                value={product.category}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <p>Sub category</p>
              <input
                name="subcategory"
                value={product.subcategory}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <p>Brand</p>
              <input
                name="brand"
                value={product.brand}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <p>Description one</p>
              <textarea
                name="shortdescription"
                value={product.shortdescription}
                onChange={handleChange}
                id=""
                cols="30"
                rows="10"
              >
                Type here...
              </textarea>
              <p>Count in stock</p>
              <input
                name="countinstock"
                value={product.countinstock}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <p>Price</p>
              <input
                name="price"
                value={product.price}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <div>
                <input
                  name="newarrival"
                  checked={newarrival === true}
                  onChange={handleArrival}
                  type="checkbox"
                />{" "}
                <span>New arrival</span>
              </div>
              <div>
                <input
                  type="file"
                  id="file"
                  name="uploadImages"
                  multiple
                  onChange={onChange}
                />
                {/* <button onClick={onSubmit}>Only jpg jpeg png allowed!</button> */}
                <button className="imgAddBtn" onClick={onSubmit}>
                  Add image
                </button>{" "}
                <span className="info">(only jpg, png allowed!)</span>
              </div>
              <h6>specification</h6>
              <div className="specification">
                <div>
                  <p>Specification Type</p>
                  <div className="inputTag">
                    <ul className="inputList">
                      {tags1.map((tag, i) => (
                        <li className="inputItem" key={tag}>
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              removeTag1(i);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </li>
                      ))}
                      <li>
                        <input
                          type="text"
                          onKeyDown={inputKeyDown1}
                          ref={(c) => {
                            tagInput1 = c;
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <p>Value one</p>
                  <div className="inputTag">
                    <ul className="inputList">
                      {tags2.map((tag, i) => (
                        <li className="inputItem" key={tag}>
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              removeTag2(i);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </li>
                      ))}
                      <li>
                        <input
                          type="text"
                          onKeyDown={inputKeyDown2}
                          ref={(c) => {
                            tagInput2 = c;
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <p>Value two</p>
                  <div className="inputTag">
                    <ul className="inputList">
                      {tags3.map((tag, i) => (
                        <li className="inputItem" key={tag}>
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              removeTag3(i);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </li>
                      ))}
                      <li className="input-tag_tags_input">
                        <input
                          type="text"
                          onKeyDown={inputKeyDown3}
                          ref={(c) => {
                            tagInput3 = c;
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <p>Description two</p>
              <textarea
                name="longdescription"
                value={product.longdescription}
                onChange={handleChange}
                id=""
                cols="30"
                rows="10"
              >
                Type here...
              </textarea>
              <button onClick={handleSubmit} className="btn publishBtn">
                Save & publish
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminProductUpdateScreen;
