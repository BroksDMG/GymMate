import propTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
function Message({ loggedUserMessage, msgData, avatar }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  }
  const formattedDate = formatDate(msgData?.createdAt);
  return (
    <div
      style={{
        marginLeft: loggedUserMessage && "auto",
        justifyContent: loggedUserMessage && "flex-end",
      }}
      className="flex w-full mt-2 space-x-3 max-w-xs "
    >
      {!loggedUserMessage && (
        <div className="">
          <img
            src={avatar}
            alt="receiverAvatar"
            className="sm:w-12 sm:h-12 object-cover object-center top-4 h-10 w-10 rounded-full min-w-max"
          />
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
      {loggedUserMessage && (
        <div className=" ">
          <img
            src={avatar}
            alt="userAvatar"
            className="sm:w-12 sm:h-12 object-cover object-center top-4 h-10 w-10 rounded-full min-w-max"
          />
        </div>
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
