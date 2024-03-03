import propTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
function Message({ loggedUserMessage, msgData, avatar }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  }
  const formattedDate = formatDate(msgData?.createdAt);
  console.log(avatar);
  return (
    <div
      style={{
        marginLeft: loggedUserMessage && "auto",
        justifyContent: loggedUserMessage && "flex-end",
      }}
      className="flex w-full mt-2 space-x-3 max-w-xs "
    >
      {!loggedUserMessage && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
          <img src={avatar} alt="receiverAvatar" />
        </div>
      )}
      <div>
        <div
          style={{
            backgroundColor: loggedUserMessage
              ? "rgb(37 99 235)"
              : "rgb(209 213 219)",
            color: loggedUserMessage && "rgb(255 255 255)",
            borderBottomLeftRadius: "0.5rem",
            borderTopLeftRadius: loggedUserMessage && "0.5rem",
            borderBottomRightRadius: "0.5rem",
            borderTopRightRadius: !loggedUserMessage && "0.5rem",
          }}
          className="p-3 "
        >
          <p className="text-sm">{msgData.message}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          {formattedDate}
        </span>
      </div>
      {loggedUserMessage && avatar?.length > 0 ? (
        <div className=" ">
          <img
            src={avatar}
            alt="userAvatar"
            className="sm:w-12 sm:h-12 object-cover object-center top-4 h-10 w-10 rounded-full min-w-max"
          />
        </div>
      ) : (
        <img
          src="https://img.freepik.com/free-photo/elf-woman-forest_71767-117.jpg?w=826&t=st=1699015819~exp=1699016419~hmac=74e1f2bd99b8e2de4489799ab8476301c1747e33fbb6fb1d6da863b5c6230ca6"
          alt="profileImg"
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover object-center top-4 "
        />
      )}
    </div>
  );
}

export default Message;

Message.propTypes = {
  loggedUserMessage: propTypes.bool,
  msgData: propTypes.object,
  avatar: propTypes.string,
};
