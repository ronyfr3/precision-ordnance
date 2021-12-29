import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import classes from "./AdminGalleryScreen.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  listGalleries,
  // createGallery,
  // deleteGallery,
} from "../actions/galleryActions";
import Loader from "../components/Loader";

const AdminGalleryScreen = ({ history }) => {
  const [spinner, setSpinner] = useState(true);

  const dispatch = useDispatch();

  const { galleries } = useSelector((state) => state.galleryList);
  const { userInfo } = useSelector((state) => state.userSignin);

  useEffect(() => {
    dispatch(listGalleries());
  }, [ dispatch ]);
  //file upload
  const [fileData, setFileData] = useState("");

  const onChange = (e) => {
    setFileData(e.target.files[0]);
  };

  //submit image to backend
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("ImageGallery", fileData);
    try {
      //dispathc
      await axios
        .post("/api/gallery", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res.data));
      window.location.reload(true, 500);
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const handleDelete = (id) => {
    axios.delete(`/api/gallery/${id}`).then((res) => console.log(res));
    window.location.reload(true, 500);
  };

  let location = useLocation();
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/")
    }
    localStorage.setItem("path", location.pathname);
    setTimeout(() => setSpinner(false), 500);
  }, [location.pathname, userInfo, history]);
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.adminGallerySection}>
          <AdminSidebar />
          <div className={classes.adminGalleryRight}>
            <AdminNavbar history={history} />
            <div className={classes.adminFile}>
              <input
                type="file"
                id="file"
                name="ImageGallery"
                onChange={onChange}
              />
              <button className="imgAddBtn" onClick={onSubmit}>
                Add image
              </button>{" "}
              <span className="warning">(only jpg, png allowed!)</span>
            </div>
            <div className={classes.adminGalleryImage}>
              {galleries?.map((image) => (
                <div
                  key={image._id}
                  className={classes.adminGallerySingleImage}
                >
                  <img loading="lazy" src={`/ImageGallery/${image?.filename}`} alt="" />
                  <button onClick={() => handleDelete(image._id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminGalleryScreen;
