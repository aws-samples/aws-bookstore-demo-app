import React from "react";
import { API } from "aws-amplify";

import AddToCart from "../../common/AddToCart";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import StarRating from "../../common/starRating/StarRating";
import "../../common/styles/productRow.css";

export class ProductRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: null,
    };
  }

  async componentDidMount() {
    try {
      const book = await this.getBook();
      this.setState({ book });
    } catch (e) {
      alert(e);
    }
  }

  getBook() {
    return API.get("books", `/books/${this.props.bookId}`);
  }

  render() {
    if (!this.state.book) return null;

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle no-padding">
            <img className="media-object product-thumb" src={this.state.book.cover} alt={`${this.state.book.name} cover`} />
          </div>
          <div className="media-body product-padding padding-20">
            <h3 className="media-heading">{this.state.book.name}
              <small className="pull-right margin-1"><h4>${this.state.book.price}</h4></small>
            </h3>
            <p><small>{this.state.book.category}</small></p>
            <FriendRecommendations bookId={this.props.bookId} />
            <div>
              Rating
              <AddToCart bookId={this.props.bookId} price={this.state.book.price} />
            </div>
            <StarRating stars={this.state.book.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRow;


