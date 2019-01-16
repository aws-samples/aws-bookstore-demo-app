import React from "react";
import { categories } from "./categories";
import "./categories.css"

export class CategoryNavBar extends React.Component {
  render() {
    return (
      <ul className="nav nav-pills justify-content-center nav-cat">
        {Object.values(categories).map(category =>
          <li role="presentation" key={category}><a className="category-link" href={`/category/${category}`}>{category}</a></li>)}
      </ul>
    );
  }
}

export default CategoryNavBar;
