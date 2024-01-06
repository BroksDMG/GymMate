import { useEffect, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import FriendListElement from "./FriendListElement";
import FriendsInviteElement from "./FriendsInviteElement";
function UserFriendsList({ userFriends, userFriendsRequest, user }) {
  const [isFriendsTab, setIsFriendsTab] = useState(false);
  async function accptFriendRequest(friendId) {
    await axios.post("/accept-friend", {
      friendId,
      currentUserId: user._id,
    });
  }
  async function rejectFriend(friendId) {
    await axios.post("/reject-friend", {
      friendId,
      currentUserId: user._id,
    });
  }
  useEffect(() => {
    userFriendsRequest?.length === 0 && setIsFriendsTab(true);
  }, []);
  return (
    <>
      <div className="flex w-full justify-center text-lg select-none">
        <button
          onClick={() => setIsFriendsTab(true)}
          className={`border-2 border-r-0 border-gray-200 rounded-lg rounded-r-none p-1 hover:bg-gray-200 ${
            isFriendsTab && "bg-gray-200"
          } capitalize`}
        >
          friends
        </button>
        <button
          onClick={() => setIsFriendsTab(false)}
          className={` border-2 border-l-0 border-gray-200 rounded-lg rounded-l-none p-1 hover:bg-gray-200  ${
            !isFriendsTab && "bg-gray-200"
          } capitalize`}
        >
          Invites
        </button>
      </div>
      <div className="grid  grid-cols-1  ">
        {isFriendsTab
          ? userFriends?.length > 0 &&
            userFriends.map((friend, key) => (
              <FriendListElement
                key={key}
                friend={friend}
                className="px-2 w-full sm:px-10 md:px-20 lg:px-10 xl:px-20"
              ></FriendListElement>
            ))
          : userFriendsRequest?.length > 0 &&
            userFriendsRequest.map((friend, key) => (
              <FriendsInviteElement
                key={key}
                friendRequst={friend}
                rejectFriend={rejectFriend}
                accptFriendRequest={accptFriendRequest}
                className="px-2 w-full sm:px-10 md:px-20 lg:px-10 xl:px-20"
              ></FriendsInviteElement>
            ))}
      </div>
    </>
  );
}

export default UserFriendsList;

UserFriendsList.propTypes = {
  userFriends: propTypes.array,
  userFriendsRequest: propTypes.array,
  user: propTypes.object,
};
