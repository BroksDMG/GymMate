import PhotosUploder from "./PhotosUploder";
import propTypes from "prop-types";
function FriendListElement({ friend }) {
  return (
    <>
      <span className="pb-2 capitalize font-bold">Friends</span>
      <div className="flex  gap-2">
        <div className="flex pt-1">
          <PhotosUploder
            name="avatar"
            addedPhotos={friend.avatar}
            backgroundStyles={`w-[4.6rem] h-[4.6rem] lg:w-[7rem] lg:h-[7rem] rounded-full  `}
            isUserAvatar={true}
            isDisplayOnly={true}
          />
        </div>
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
