import React from "react";
import "../../common/styles/gallery.css";
import StarRating from "../../common/starRating/StarRating";
import AddToCart from "../../common/AddToCart";
import { Book } from "../bestSellers/BestSellerProductRow";

interface CategoryGalleryBookProps {
  book: Book;
}

export class CategoryGalleryBook extends React.Component<CategoryGalleryBookProps> {
  render() {
    if (!this.props.book) return;
    return (
      <div className="col-sm-3 col-md-3">
        <div className="thumbnail no-border">
          <p className="rating-container"><StarRating stars={this.props.book.rating} /><span className="pull-right">{`$${this.props.book.price}`}</span></p>
          <img src={this.props.book.cover} alt={`${this.props.book.name} cover`} />
          <div className="caption">
            <h4 className="text-center">{this.props.book.name}</h4>
            <AddToCart bookId={this.props.book.id} price={this.props.book.price} variant="center" />
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryGalleryBook;