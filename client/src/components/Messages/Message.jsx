import propTypes from "prop-types";
function Message({ loggedUserMessage }) {
  return (
    <div
      style={{
        marginLeft: loggedUserMessage && "auto",
        justifyContent: loggedUserMessage && "flex-end",
      }}
      className="flex w-full mt-2 space-x-3 max-w-xs "
    >
      {!loggedUserMessage && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
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
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.
          </p>
        </div>
        <span className="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
      {loggedUserMessage && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      )}
    </div>
  );
}

export default Message;

Message.propTypes = {
  loggedUserMessage: propTypes.bool,
};
