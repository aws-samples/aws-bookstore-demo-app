import React from "react";

import Brenda from "../../images/avatars/Brenda.png";
import Erin from "../../images/avatars/Erin.png";
import Jacob from "../../images/avatars/Jacob.png";
import Jeff from "../../images/avatars/Jeff.png";
import Jennifer from "../../images/avatars/Jennifer.png";
import John from "../../images/avatars/John.png";
import Sarah from "../../images/avatars/Sarah.png";

const friends = [Brenda, Erin, Jacob, Jeff, Jennifer, John, Sarah];

interface FriendThumbProps {}

export class FriendThumb extends React.Component<FriendThumbProps> {
  render() {
    const randomFriend = friends[Math.floor(Math.random() * friends.length)];
    return (
      <img className="friend-thumb" src={randomFriend} alt={randomFriend} />
    );
  }
}

export default FriendThumb;
