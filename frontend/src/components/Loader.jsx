import React from 'react'
import classes from './Loader.module.css'

const Loader = () => {
  return (
    <section className={classes.loaderSection}>
      <div>
        <img src="/icons/loader.gif" alt="" />
      </div>
    </section>
  )
}

export default Loader
