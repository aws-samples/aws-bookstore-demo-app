import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import "./starRating.css";

class StarRating extends React.Component {
  render() { 
    return (
      <span>             
        <Glyphicon glyph={this.props.stars >= 1 ? "star" : "star-empty"} />
        <Glyphicon glyph={this.props.stars >= 2 ? "star" : "star-empty"} />
        <Glyphicon glyph={this.props.stars >= 3 ? "star" : "star-empty"} />
        <Glyphicon glyph={this.props.stars >= 4 ? "star" : "star-empty"} />
        <Glyphicon glyph={this.props.stars >= 5 ? "star" : "star-empty"} />                          
      </span>
    );
  }
}

export default StarRating;