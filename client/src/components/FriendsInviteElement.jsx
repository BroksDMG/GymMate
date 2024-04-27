import propTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import useAvatarImg from "./hooks/useAvatarImg";
import defaultUserAvatar from "../assets/defaultUser.png";
function FriendsInviteElement({
  friendRequst,
  accptFriendRequest,
  rejectFriend,
}) {
  const userAvatar = useAvatarImg(friendRequst?.avatar, defaultUserAvatar);
  return (
    <>
      <span className="pb-2 capitalize font-bold">Invites</span>
      <div className="flex  gap-2">
        <div className="flex pt-1">
          <img
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center top-4"
            src={userAvatar}
            alt="defaultProfileImg"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="text-sm sm:text-base font-bold capitalize">
            {friendRequst.name} {friendRequst.surname}
          </p>

          <div className="flex h-full w-full">
            <button
              onClick={() => accptFriendRequest(friendRequst._id)}
              className="h-full w-full flex justify-center items-center bg-gray-200 hover:bg-green-500 hover:text-white rounded-r-none rounded-lg px-2 py-1 text-gray-400 font-bold"
            >
              <FaCheck />
            </button>
            <button
              onClick={() => rejectFriend(friendRequst._id)}
              className="h-full w-full text-xl flex justify-center items-center bg-gray-200 hover:bg-red-500 hover:text-white rounded-l-none rounded-lg px-2 py-1 text-gray-400 font-bold"
            >
              <FaXmark />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendsInviteElement;

FriendsInviteElement.propTypes = {
  friendRequst: propTypes.object,
  accptFriendRequest: propTypes.func,
  rejectFriend: propTypes.func,
};
