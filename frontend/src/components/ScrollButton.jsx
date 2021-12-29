import React, {useState} from 'react';
import classes from './ScrollButton.module.css'
// import {FaArrowCircleUp} from 'react-icons/fa';
// import { Button } from './Styles';
  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    // <Button>
    //  <FaArrowCircleUp onClick={scrollToTop} 
    //  style={{display: visible ? 'inline' : 'none'}} />
    // </Button>
    <button className={classes.scrollBtn} onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}}>
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}

export default ScrollButton