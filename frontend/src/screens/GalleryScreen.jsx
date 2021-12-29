import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import classes from "./GalleryScreen.module.css";
import ImageViewer from "react-simple-image-viewer";

const GalleryScreen = () => {
  const [spinner, setSpinner] = useState(true);
  const { galleries } = useSelector((state) => state.galleryList);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <section className={classes.gallerySection}>
          <div className={`${classes.galleryWrapper} container`}>
            <h2>Our Gallery</h2>
            <div className={classes.allGalleryImage}>
              {galleries.map((src, index) => (
                <img
                  src={`/ImageGallery/${src?.filename}`}
                  onClick={() => openImageViewer(index)}
                  width="300"
                  key={index}
                  style={{ margin: "2px" }}
                  alt=""
                />
              ))}

             {isViewerOpen && (
               <div className={classes.bigImage}>
               <ImageViewer
                  src={galleries.map((src) => `/ImageGallery/${src?.filename}`)}
                  currentIndex={currentImage}
                  disableScroll={true}
                  closeOnClickOutside={true}
                  onClose={closeImageViewer}
                />
                {/* <span className={classes.times}><i className="fas fa-times"></i></span> */}
              </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GalleryScreen;