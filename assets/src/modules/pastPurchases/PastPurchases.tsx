import React, { Component } from "react";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import "../../common/hero/hero.css";
import { PurchasedProductRow } from "./PurchasedProductRow";
import { Auth, API } from "aws-amplify";
import bestSellers from "../../images/bestSellers.png";
import yourshoppingcart from "../../images/yourshoppingcart.png";
import { Order } from "../cart/CartProductRow";

interface PastPurchasesProps {}

interface Purchases {
  orderDate: number;
  orderId: string;
  books: Order[];
}

interface PastPurchasesState {
  userInfo: any; // FIXME
  isLoading: boolean;
  orders: Purchases[];
}

export default class PastPurchases extends Component<PastPurchasesProps, PastPurchasesState> {
  constructor(props: PastPurchasesProps) {
    super(props);

    this.state = {
      userInfo: null,
      isLoading: true,
      orders: []
    };
  }

  async componentDidMount() {
    const userInfo = await Auth.currentUserInfo();
    this.setState({ userInfo })

    try {
      const orders = await this.listOrders();
      this.setState({ 
        orders: orders,
        isLoading: false
     });
    } catch (e) {
      alert(e);
    }
  }

  listOrders() {
    return API.get("orders", "/orders", null);
  }

  getPrettyDate = (orderDate: number) => {
    const date = new Date(orderDate);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
  }

  render() {
    return (
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <div className="well-bs col-md-12">
          {this.state.userInfo && <div className="white-box no-margin-top">
            <h3>{`Hello ${this.state.userInfo.attributes.email}!`}</h3>
          </div>}
          <div className="white-box">
            <h3>Past purchases</h3>
          </div>
          {!this.state.isLoading && this.state.orders && this.state.orders
            .sort((order1, order2) => order2.orderDate - order1.orderDate)
            .map(order => 
              <div className="order-date" key={order.orderId}>
                <h4>{`Order date: ${this.getPrettyDate(order.orderDate)}`}</h4>
                {order.books.map((book) => <PurchasedProductRow order={book} key={book.bookId} />)}
              </div>)
          }
          
          <div className="well-bs no-margin-top no-padding col-md-12">
          <a href="/best"><img src={bestSellers} alt="Best sellers" className="checkout-img no-padding" /></a>
          <a href="/cart"><img src={yourshoppingcart} alt="Shopping cart" className="checkout-img no-padding" /></a>
          
          </div>
        </div>
      </div>
    );
  }
}