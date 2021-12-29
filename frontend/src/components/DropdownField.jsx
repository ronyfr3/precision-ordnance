import React from "react";
import { useSelector } from "react-redux";
import classes from "./DropdownField.module.css";

const DropdownField = ({
  categorys,
  subcategorys,
  brands,
  setCategorys,
  setSubcategorys,
  setBrands,
  inputCategory,
  inputSubcategory,
  inputBrand,
  setInputCategory,
  setInputSubcategory,
  setInputBrand,
  category,
  subcategory,
  brand,
}) => {
  const { products } = useSelector((state) => state.productsReducer);

  // category
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const uniqueArray = products
    ?.map((x) => x.category.toLowerCase().trim())
    .filter(onlyUnique);

  // subcategory
  function onlyUnique1(value, index, self) {
    return self.indexOf(value) === index;
  }
  const uniqueArray1 = products
    ?.map((x) => x.subcategory.toLowerCase().trim())
    .filter(onlyUnique1);

  // brand
  function onlyUnique2(value, index, self) {
    return self.indexOf(value) === index;
  }
  const uniqueArray2 = products
    ?.map((x) => x.brand.toLowerCase().trim())
    .filter(onlyUnique2);

  // console.log(inputCategory, inputSubcategory, inputBrand);

  return (
    <>
      <div className={classes.dropdownFieldSection}>
        {category && (
          <>
            <div>
              <p>Existing category</p>
              <select
                value={categorys}
                onChange={(e) => setCategorys(e.target.value)}
                name="categorys"
                id=""
              >
                <option value="">Select...</option>
                {uniqueArray.map((category, idx) => {
                  return <option key={idx} value={category}>{category}</option>;
                })}
              </select>
            </div>
            <div>
              <p>Add new category</p>
              <input
                type="text"
                name={category ? "categorys" : "inputCategory"}
                value={inputCategory}
                onChange={(e) => setInputCategory(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <div className={classes.dropdownFieldSection}>
        {subcategory && (
          <>
            <div>
              <p>Existing subcategory</p>
              <select
                value={subcategorys}
                onChange={(e) => setSubcategorys(e.target.value)}
                name="subcategorys"
                id=""
              >
                <option value="">Select...</option>
                {uniqueArray1.map((subcategory, idx) => {
                  return <option key={idx} value={subcategory}>{subcategory}</option>;
                })}
              </select>
            </div>

            <div>
              <p>Add new subcategory</p>
              <input
                type="text"
                name="inputSubcategory"
                value={inputSubcategory}
                onChange={(e) => setInputSubcategory(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <div className={classes.dropdownFieldSection}>
        {brand && (
          <>
            <div>
              <p>Existing brand</p>
              <select
                value={brands}
                onChange={(e) => setBrands(e.target.value)}
                name="brands"
                id=""
              >
                <option value="">Select...</option>
                {uniqueArray2.map((brand, idx) => {
                  return <option key={idx} value={brand}>{brand}</option>;
                })}
              </select>
            </div>
            <div>
              <p>Add new brand</p>
              <input
                type="text"
                name="inputBrand"
                value={inputBrand}
                onChange={(e) => setInputBrand(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DropdownField;
