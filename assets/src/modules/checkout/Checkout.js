import React, { Component } from "react";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import { CheckoutForm } from "./checkoutForm/CheckoutForm";

export default class Checkout extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <CategoryNavBar />
        <div className="well-bs">
          <div className="white-box no-margin-top no-margin-bottom">
            <h3>Checkout</h3>
          </div>
        </div>
        <CheckoutForm />
      </div>
    );
  }
}