import React from "react";
import "../../common/styles/productRow.css";
import StarRating from "../../common/starRating/StarRating";
import { API } from "aws-amplify";
import AddToCart from "../../common/AddToCart";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import { Book } from "../bestSellers/BestSellerProductRow";

interface ProductRowProps {
  bookId: string;
}

interface ProductRowState {
  book: Book | undefined;
}

export class ProductRow extends React.Component<ProductRowProps, ProductRowState> {
  constructor(props: ProductRowProps) {
    super(props);

    this.state = {
      book: undefined,
    };
  }

  componentDidMount() {
    API.get("books", `/books/${this.props.bookId}`, null)
      .then(response => this.setState({ book: response }))
      .catch(error => alert(error));
  }

  render() {
    if (!this.state.book) return null;

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle no-padding">
            <img className="product-thumb border" src={this.state.book.cover} alt={`${this.state.book.name} cover`} />
          </div>
          <div className="media-body product-padding padding-20">
            <h3 className="media-heading">{this.state.book.name}
              <small className="pull-right ">${this.state.book.price}</small>
            </h3>
            <p className="no-margin"><small>{this.state.book.category}</small></p>
            <FriendRecommendations bookId={this.props.bookId} />
            <div>
              Rating
              <AddToCart bookId={this.state.book.id} price={this.state.book.price} />
            </div>
            <StarRating stars={this.state.book.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRow;


