import React from "react";
import { ProductRow } from "./ProductRow";
import { API } from "aws-amplify";

interface FriendsBoughtProps {

}

interface FriendsBoughtState {
  isLoading: boolean;
  recommendations: any[]; // FIXME
}

export class FriendsBought extends React.Component<FriendsBoughtProps, FriendsBoughtState> {
  constructor(props: FriendsBoughtProps) {
    super(props);

    this.state = {
      isLoading: true,
      recommendations: []
    };
  }

  componentDidMount() {
    API.get("recommendations", "/recommendations", null)
      .then(response => {
        this.setState({
          recommendations: response,
          isLoading: false
        });
      })
      .catch(error => alert(error));
  }

  render() {
    if (this.state.isLoading) return null;

    return (
      <div className="well-bs no-padding-top col-md-12 no-border">
        <div className="container-category">
          <h3>Books your friends have bought</h3>
        </div>
        {this.state.recommendations.slice(0,5).map(recommendation =>
          <ProductRow bookId={recommendation.bookId} key={recommendation.bookId} />
        )}
      </div>
    );
  }
}

export default FriendsBought;