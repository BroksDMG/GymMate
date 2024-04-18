import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import autosize from "autosize";
import { BiSolidErrorCircle } from "react-icons/bi";
function TextAreaField({ children, value, error, ...props }) {
  const [isFocus, setIsFocus] = useState(false);
  const [isError, setIsError] = useState(false);

  if (error && !isError) {
    setIsError(true);
  }

  function handleOnClick() {
    setIsError(false);
  }
  useEffect(() => {
    setIsFocus(!!value);
  }, [value]);
  useEffect(() => {
    autosize(document.querySelector("input"));
  }, []);
  return (
    <div
      onFocus={() => setIsFocus(true)}
      className={` ${children ? "mt-3 sm:mt-4" : ""}
      w-full  text-lightBlue border-lightBlue font-medium   text-sm sm:text-base lg:text-lg min-w-[140px] relative transform duration-200 ease-linear
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
        type="date"
        onClick={() => handleOnClick()}
        onBlur={() => setIsFocus(value ? true : false)}
        style={{}}
        className={`border-[2px] rounded-l-xl  lg:rounded-l-xl text-right  resize-none gap-3 text-mediumBlue  p-2 pr-2 md:p-4  border-inherit w-full focus-visible:outline-none
      hover:border-inherit 
      
      ${isFocus ? "text-mediumBlue border-mediumBlue  " : ""}`}
        value={value}
        {...props}
      ></input>
      <div
        className={`absolute top-2  md:top-4 left-5 pt-0.5   pointer-events-none  max-w-max transform duration-200 ease-linear${
          isFocus
            ? "translate-x-10 -translate-y-5 md:-translate-y-7 scale-[0.88] px-2 z-[1111] text-mediumBlue"
            : ""
        }
        ${children ? "bg-white" : "bg-transparent"}
        `}
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
