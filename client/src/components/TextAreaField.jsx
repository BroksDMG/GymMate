import { useState } from "react";
import PropTypes from "prop-types";
import { BiSolidErrorCircle } from "react-icons/bi";
function TextAreaField({
  children,
  value,
  error,
  inputHeight = "h-[56px]",
  ...props
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [isError, setIsError] = useState(false);
  if (error && !isError) {
    setIsError(true);
  }

  function handleOnClick() {
    setIsError(false);
  }
  //   console.log(isFocus);
  return (
    <div
      onFocus={() => setIsFocus(true)}
      className={`w-full h-[40px] lg:h-[60px] text-lightBlue border-lightBlue font-medium  text-base lg:text-xl min-w-[140px] relative mt-6 transform duration-200 ease-linear
    hover:border-darkBluePrimary hover:text-darkBluePrimary active:text-mediumBlue
    `}
    >
      <div
        className={`text-red-400 text- translate-x-3 translate-y-3 lg:translate-y-4 absolute right-10
      ${isError ? "text-xl lg:text-2xl" : ""}`}
      >
        {isError && !isFocus && <BiSolidErrorCircle />}
      </div>

      <input
        onClick={() => handleOnClick()}
        onBlur={() => setIsFocus(value ? true : false)}
        className={`border-[2px] rounded-l-xl   overflow-y-scroll resize-none p-4  border-inherit w-full focus-visible:outline-none
      hover:border-inherit ${
        isFocus ? "text-mediumBlue border-mediumBlue  " : ""
      }`}
        {...props}
      ></input>
      <div
        className={`absolute top-4 lg:top-3 left-5 pt-0.5 bg-white  pointer-events-none  max-w-max transform duration-200 ease-linear${
          isFocus
            ? "translate-x-10 -translate-y-7 scale-[0.88] px-2 z-[1111] text-mediumBlue"
            : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
TextAreaField.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string || PropTypes.number,
  error: PropTypes.string,
  inputHeight: PropTypes.string,
};

export default TextAreaField;
