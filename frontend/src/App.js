import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import { listProducts } from "./actions/productsAction";
import ActivationScreen from "./screens/ActivationScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import AdminOrderlistScreen from "./screens/AdminOrderlistScreen";
import AdminProductDetailsScreen from "./screens/AdminProductDetailsScreen";
import AdminProductlistScreen from "./screens/AdminProductlistScreen";
import AdminSettingsScreen from "./screens/AdminSettingsScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import HomeScreen from "./screens/HomeScreen";
import AdminProductCreateScreen from "./screens/AdminProductCreateScreen";
import AdminProductUpdateScreen from "./screens/AdminProductUpdateScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import CategoryScreen from "./screens/CategoryScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import SigninSignupScreen from "./screens/SigninSignupScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import { allOrders } from "./actions/orderActions";
import AdminOrderDetailsScreen from "./screens/AdminOrderDetailsScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import SubcategoryScreen from "./screens/SubcategoryScreen";
import AllProductScreen from "./screens/AllProductScreen";
import SearchProductScreen from "./screens/SearchProductScreen";
import Header from "./components/Header";
import BrandScreen from "./screens/BrandScreen";
import AdminGalleryScreen from "./screens/AdminGalleryScreen";
import GalleryScreen from "./screens/GalleryScreen";
import { listGalleries } from "./actions/galleryActions";
import SearchScreen from "./screens/SearchScreen";

const App = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    dispatch(listGalleries())
    dispatch(allOrders());
  }, [dispatch]);

  const [pathlocation, setPathlocation] = useState();
  let location = useLocation();
  useEffect(() => {
    setPathlocation(localStorage.getItem("path"));
  }, [location]);

  return (
    <>
    {
      pathlocation===location.pathname? "" : <Header />
    }
      <Switch>
        <Route path="/admin/dashboard" component={AdminDashboardScreen} />
        <Route path="/admin/gallery" component={AdminGalleryScreen} />
        <Route path="/admin/settings" component={AdminSettingsScreen} />
        <Route
          exact
          path="/admin/productlist"
          component={AdminProductlistScreen}
        />
        <Route
          exact
          path="/admin/productlist/:id"
          component={AdminProductDetailsScreen}
        />
        <Route exact path="/admin/orderlist" component={AdminOrderlistScreen} />
        <Route
          exact
          path="/admin/orderlist/:id"
          component={AdminOrderDetailsScreen}
        />
        <Route
          path="/admin/productcreate"
          component={AdminProductCreateScreen}
        />
        <Route
          path="/admin/productupdate/:id"
          component={AdminProductUpdateScreen}
        />
        <Route path="/gallery" component={GalleryScreen} />
        <Route path="/order" component={OrderSuccessScreen} />
        <Route path="/profile" component={UserProfileScreen} />
        <Route path="/checkout" component={CheckoutScreen} />
        <Route path="/signin-signup" component={SigninSignupScreen} />
        <Route path="/user/activate/:token" component={ActivationScreen} />
        <Route exact path="/product/:id" component={ProductDetailsScreen} />
        <Route path="/category/:category" component={CategoryScreen} />
        <Route path="/subcategory/:sub" component={SubcategoryScreen} />
        <Route path="/brand/:brand" component={BrandScreen} />
        <Route exact path="/search" component={SearchScreen} />
        <Route exact path="/search/:search" component={SearchProductScreen} />
        <Route path="/all-products" component={AllProductScreen} />
        <Route path="/shopping-cart" component={ShoppingCartScreen} />
        <Route path="/" exact component={HomeScreen} />
      </Switch>
    </>
  );
};

export default App;