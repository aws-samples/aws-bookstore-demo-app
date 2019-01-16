import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";
import "../../../common/styles/gallery.css";

import burgers from "../../../images/bestSellers/burgers.png";
import italian from "../../../images/bestSellers/italian.png";
import noodles from "../../../images/bestSellers/noodles.png";
import pancakes from "../../../images/bestSellers/pancakes.png";
import pineapple from "../../../images/bestSellers/pineapple.png";
import umami from "../../../images/bestSellers/umami.png";

const bestSellers = [burgers, italian, noodles, pancakes, pineapple, umami];

export class BestSellersBar extends React.Component {
  render() {
    return (
      <div className="center ad-gallery nav">
        <div className="col-md-2 hidden-sm hidden-xs">
          <LinkContainer to="/best">
            <NavItem><h3>Bookstore<br/>Best Sellers</h3></NavItem>
          </LinkContainer>
        </div>
        <div className="row">
          {bestSellers.map(book =>
            <div className="col-md-2 hidden-sm hidden-xs" key={book}>
              <LinkContainer to="/best">
                <NavItem><img src={book} className="thumbs" /></NavItem>
              </LinkContainer>
            </div>)}
        </div>
      </div>
    );
  }
}

export default BestSellersBar;