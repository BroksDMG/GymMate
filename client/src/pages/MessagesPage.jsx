import error404Img from "../assets/404-Page-Featured-Image.png";

function MessagesPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        src={error404Img}
        alt="error404"
        className="h-full w-full object-contain object-center "
      />
    </div>
  );
}

export default MessagesPage;
