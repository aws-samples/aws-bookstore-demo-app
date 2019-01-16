import React from "react";
import "../../common/styles/productRow.css";
import StarRating from "../../common/starRating/StarRating";
import { API } from "aws-amplify";
import AddToCart from "../../common/AddToCart";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import { Book } from "../bestSellers/BestSellerProductRow";
import { Order } from "../cart/CartProductRow";

interface PurchasedProductRowProps {
  order: Order;
}

interface PurchasedProductRowState {
  book: Book | undefined;
}

export class PurchasedProductRow extends React.Component<PurchasedProductRowProps, PurchasedProductRowState> {
  constructor(props: PurchasedProductRowProps) {
    super(props);

    this.state = {
      book: undefined
    };
  }

  async componentDidMount() {
    try {
      const book = await this.getBook(this.props.order);
      this.setState({ book });
    } catch (e) {
      alert(e);
    }
  }

  getBook(order: Order) {
    return API.get("books", `/books/${order.bookId}`, null);
  }

  render() {
    if (!this.state.book) {
      return (
        <div className="white-box">
          <div className="media">
            <div className="media-left media-middle">
              <div className="loader-no-margin" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle">
            <img className="media-object product-thumb" src={this.state.book.cover} alt={`${this.state.book.name} covers`} />
          </div>
          <div className="media-body">
            <h3 className="media-heading">{this.state.book.name}
              <div className="pull-right margin-1">
                <small>{`${this.props.order.quantity} @ ${this.state.book.price}`}</small>
              </div>
            </h3>
            <small>{this.state.book.category}</small>
            <FriendRecommendations bookId={this.props.order.bookId} />
            <div>
              Rating
              <AddToCart bookId={this.state.book.id} price={this.state.book.price} variant="buyAgain" />
            </div>
            <StarRating stars={this.state.book.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default PurchasedProductRow;


