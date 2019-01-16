import React from "react";
import "../../common/styles/productRow.css";
import { API } from "aws-amplify";
import StarRating from "../../common/starRating/StarRating";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import { Glyphicon } from "react-bootstrap";
import { Book } from "../bestSellers/BestSellerProductRow";

export interface Order {
  bookId: string;
  quantity: number;
  price: number
}

interface CartProductRowProps {
  order: Order;
  calculateTotal: () => void;
}

interface CartProductRowState {
  book: Book | undefined;
  removeLoading: boolean;
}

export class CartProductRow extends React.Component<CartProductRowProps, CartProductRowState> {
  constructor(props: CartProductRowProps) {
    super(props);

    this.state = {
      book: undefined,
      removeLoading: false
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

  onRemove = async () => {
    this.setState({ removeLoading: true });
    await API.del("cart", "/cart", {
      body: {
        bookId: this.props.order.bookId,
      }
    });

    this.props.calculateTotal();
  }

  onQuantityUpdated = async (event: any) => {
    await API.put("cart", "/cart", {
      body: {
        bookId: this.props.order.bookId,
        quantity: parseInt(event.target.value, 10)
      }
    });
  }

  render() {
    if (!this.state.book) return null;

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle">
            <img className="media-object product-thumb" src={this.state.book.cover} alt={`${this.state.book.name} cover`} />
          </div>
          <div className="media-body">
            <h3 className="media-heading">{this.state.book.name}
              <div className="pull-right margin-1">
                <small>${this.state.book.price}</small>
              </div>
            </h3>
            <p>
              <small>{this.state.book.category}</small>
            </p>
            <FriendRecommendations bookId={this.props.order.bookId} />
            <div>
              Rating
              <div className="pull-right">
                <div className="input-group">

                  <input type="number" className="form-control" placeholder="Quantity" defaultValue={this.props.order.quantity.toString()} onChange={this.onQuantityUpdated} min={1} />
                  <span className="input-group-btn">
                    <button className="btn btn-black" type="button" onClick={this.onRemove} disabled={this.state.removeLoading}>
                      {this.state.removeLoading && <Glyphicon glyph="refresh" className="spinning" />} 
                      Remove
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <p><StarRating stars={this.state.book.rating} /></p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProductRow;


