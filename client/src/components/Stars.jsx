import { useState } from "react";
import propTypes from "prop-types";
import { BsStarFill, BsStar } from "react-icons/bs";
function Stars({
  quantity = 1,
  high,
  setRatingOutComponent,
  setTempRatingOutComponent,
  onlyShow = false,
  defaultRating = 0,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [temRating, setTemRating] = useState(defaultRating);
  const handleStarClik = (newRating) => {
    if (onlyShow) return;
    setRating(newRating);
    setRatingOutComponent(newRating);
  };
  function handleHoverOn(valueOnHoverOn) {
    if (onlyShow) return;
    setTemRating(valueOnHoverOn);
    setTempRatingOutComponent(valueOnHoverOn);
  }
  function handleHoverOff(valueOnHoverOff) {
    if (onlyShow) return;
    setTemRating(valueOnHoverOff);
    setTempRatingOutComponent(valueOnHoverOff);
  }
  return (
    <div className="flex gap-3 pt-2">
      {Array.from({ length: quantity }, (_, i) => (
        <Star
          key={i}
          fill={temRating ? temRating >= i + 1 : rating >= i + 1}
          click={() => handleStarClik(i + 1)}
          onHoveron={() => handleHoverOn(i + 1)}
          onHoveroff={() => handleHoverOff(0)}
          high={high}
        ></Star>
      ))}
    </div>
  );
}

function Star({ fill, click, onHoveron, onHoveroff, high }) {
  return (
    <div
      role="button"
      onClick={() => click()}
      onMouseEnter={onHoveron}
      onMouseLeave={onHoveroff}
    >
      {fill ? (
        <span className=" relative text-yellow-400">
          <BsStarFill
            style={{ fontSize: high }}
            className="absolute z-10 -top-2"
          />
          <BsStarFill
            style={{ fontSize: high }}
            className=" blur-[3px] text-yellow-600"
          />
        </span>
      ) : (
        <span className=" relative text-lightBlue">
          <BsStar style={{ fontSize: high }} />
          <BsStar
            style={{ fontSize: high }}
            className=" absolute top-1 blur-[6px]"
          />
        </span>
      )}
    </div>
  );
}
Stars.propTypes = {
  quantity: propTypes.number.isRequired,
  high: propTypes.string,
  setRatingOutComponent: propTypes.func,
  setTempRatingOutComponent: propTypes.func,
  onlyShow: propTypes.bool,
  defaultRating: propTypes.number,
};
Star.propTypes = {
  fill: propTypes.bool.isRequired,
  click: propTypes.func.isRequired,
  onHoveron: propTypes.func.isRequired,
  onHoveroff: propTypes.func.isRequired,
  high: propTypes.string,
};
export default Stars;
