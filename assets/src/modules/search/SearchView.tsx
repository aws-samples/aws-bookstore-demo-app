import React, { Component } from "react";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "./searchBar/SearchBar";
import { SearchGallery } from "./SearchGallery";

interface SearchViewProps {
  match: any;
}

export default class SearchView extends Component<SearchViewProps> {
  render() {
    return (
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <SearchGallery match={this.props.match} />
      </div>
    );
  }
}