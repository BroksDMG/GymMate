import propTypes from "prop-types";
import { Link } from "react-router-dom";
import useAvatarImg from "./hooks/useAvatarImg";
import defaultUserAvatar from "../assets/defaultUser.png";
function FriendListElement({ friend }) {
  const userAvatar = useAvatarImg(friend?.avatar, defaultUserAvatar);

  return (
    <>
      <span className="pb-2 capitalize font-bold">Friends</span>
      <div className="flex  gap-2">
        <Link to={"/account/" + friend._id} className="flex pt-1">
          <img
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center top-4"
            src={userAvatar}
            alt="defaultProfileImg"
          />
        </Link>
        <div className="flex flex-col gap-2 ">
          <p className="text-sm sm:text-base font-bold capitalize">
            {friend.name} {friend.surname}
          </p>

          <p className="text-xs sm:text-sm text-darkBluePrimary">
            {friend.userDescription?.length > 110
              ? friend.userDescription.substring(0, 110) + "..."
              : friend.userDescription}
          </p>
        </div>
      </div>
    </>
  );
}

export default FriendListElement;

FriendListElement.propTypes = {
  friend: propTypes.object,
};
