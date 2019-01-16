import { API } from 'aws-amplify';
import React from 'react';
import { FriendThumb } from './FriendThumb';

interface FriendRecommendationsProps {
  bookId: string;
}

interface FriendRecommendationsState {
  friends: any[];
}

class FriendRecommendations extends React.Component<FriendRecommendationsProps, FriendRecommendationsState> {
  constructor(props: FriendRecommendationsProps) {
    super(props);

    this.state = {
      friends: []
    };
  }

  getFriends = () => {
    return API.get("recommendations", `/recommendations/${this.props.bookId}`, null);
  }

  async componentDidMount() {
    try {
      const friends = await this.getFriends();
      this.setState({ friends });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    // No recommendations to show
    if (!(this.state.friends[0] && this.state.friends[0].friendsPurchased && this.state.friends[0].friendsPurchased.length > 0)) {
      return <div className="no-friends-padding" />
    }
    
    const numFriendsPurchased = this.state.friends[0].friendsPurchased.length;
    const friends = this.state.friends[0].friendsPurchased;
    return (
      <div>
        <div>Friends who bought this book</div>
        <p>
          {friends.slice(0, 3).map((friend: any) => <FriendThumb key={friend} />)}
          {numFriendsPurchased > 3 && <span className="orange">{` +${numFriendsPurchased - 3} ${(numFriendsPurchased - 3) > 1 ? "others" : "other"}`}</span>}
        </p>
      </div>
    );
  }
}

export default FriendRecommendations;