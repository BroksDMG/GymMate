import axios from "axios";

export const addUserAvatar = async (user, values) =>
  await axios.post("/user-avatar", {
    ...user,
    ...values,
  });

export const getFriendsRequest = (user) =>
  axios.get(`/friend-request/${user._id}`);

export const sendFriendRequest = async (user, accountId) =>
  await axios.post("/add-friend", {
    currentUserId: user._id,
    friendId: accountId,
  });

export const getFriendById = (user) => axios.get(`/friends/${user._id}`);

export const getUserEvents = () => axios.get("/user/user-events");
