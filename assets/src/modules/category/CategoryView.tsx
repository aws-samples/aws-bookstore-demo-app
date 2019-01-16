import React, { Component } from "react";
import { CategoryNavBar } from "./categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import { BestSellersBar } from "../bestSellers/bestSellersBar/BestSellersBar";
import { CategoryGallery } from "./CategoryGallery";

import database from "../../images/hero/hero-database.png";
import cars from "../../images/hero/hero-cars.png";
import cooks from "../../images/hero/hero-cookbooks.png";
import fairy from "../../images/hero/hero-fairytales.png";
import home from "../../images/hero/hero-home.png";
import scifi from "../../images/hero/hero-science.png";
import woodwork from "../../images/hero/hero-woodwork.png";

import "../../common/hero/hero.css";
import { categories } from "./categoryNavBar/categories";

interface CategoryViewProps {
  match: any;
}

export default class CategoryView extends Component<CategoryViewProps> {
  getImage = () => {
    switch (this.props.match.params.id) {
      case categories.cooks:
        return cooks;
      case categories.database:
        return database;
      case categories.fairy:
        return fairy;
      case categories.scifi:
        return scifi;
      case categories.home:
        return home;
      case categories.cars:
        return cars;
      case categories.woodwork:
        return woodwork;
      default:
        return cooks;
    }
  }

  render() {
    return (
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <BestSellersBar />
        <img src={this.getImage()} alt={`${this.getImage()} hero`} className="img-fluid full-width top-hero-padding" />
        <CategoryGallery match={this.props.match} />
      </div>
    );
  }
}