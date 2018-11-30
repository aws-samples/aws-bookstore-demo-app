import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./common/AppliedRoute";
import Checkout from "./modules/checkout/Checkout";
import CheckoutConfirm from "./modules/checkout/CheckoutConfirm";
import Home from "./modules/signup/Home";
import Login from "./modules/signup/Login";
import NotFound from "./modules/notFound/NotFound";
import Signup from "./modules/signup/Signup";
import CategoryView from "./modules/category/CategoryView";
import ShoppingCart from "./modules/cart/ShoppingCart";
import PastPurchases from "./modules/pastPurchases/PastPurchases";
import BestSellers from "./modules/bestSellers/BestSellers";
import SearchView from "./modules/search/SearchView"

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/best" exact component={BestSellers} props={childProps} />
    <AppliedRoute path="/cart" exact component={ShoppingCart} props={childProps} />
    <AppliedRoute path="/category/:id" exact component={CategoryView} props={childProps} />
    <AppliedRoute path="/past" exact component={PastPurchases} props={childProps} />
    <AppliedRoute path="/checkout" exact component={Checkout} props={childProps} />
    <AppliedRoute path="/checkout-confirm" exact component={CheckoutConfirm} props={childProps} />
    <AppliedRoute path="/search/:id" exact component={SearchView} props={childProps} />
    <Route component={NotFound} />
  </Switch>;