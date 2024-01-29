import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiSolidErrorCircle } from "react-icons/bi";
import Modal from "./Modal";
function InputField({
  children,
  value,
  error,
  onChange,
  inputHeight = "56",
  isList = false,
  listOptions = [],
  listOnChange,
  ...props
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (error && !isError) {
    setIsError(true);
    setIsModalOpen(true);
  }
  function handleOnClick() {
    setIsError(false);
    setIsListOpen((isPrevListOpen) => !isPrevListOpen);
  }
  function handleOptionOnClick(option) {
    setSelectedValue(option);
    setIsListOpen(false);
    setIsFocus(true);
    listOnChange(option);
  }
  useEffect(() => {
    addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        setSelectedValue("");
        setIsListOpen(false);
      }
    });
  });
  useEffect(() => {
    setIsFocus(!!value);
  }, [value]);
  return (
    <div
      onFocus={() => setIsFocus(true)}
      className={`w-full h-[40px] lg:h-[60px] text-lightBlue border-lightBlue font-medium  text-sm sm:text-base lg:text-xl min-w-[100px] relative mt-3 sm:mt-6 transform duration-200 ease-linear
    hover:border-darkBluePrimary hover:text-darkBluePrimary active:text-mediumBlue
    `}
    >
      <div
        className={`text-red-400  -translate-x-10 translate-y-3 lg:translate-y-4 absolute right-10
      ${isError ? "text-xl lg:text-2xl" : ""}`}
      >
        {isError && !isFocus && <BiSolidErrorCircle />}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {error}
          </Modal>
        )}
      </div>

      <input
        onClick={() => handleOnClick()}
        onBlur={() => setIsFocus(value ? true : false)}
        className={`border-[2px] rounded-l-xl lg:h-16 overflow-scroll p-2 pr-0 sm:p-4  border-inherit w-full focus-visible:outline-none
  hover:border-inherit ${isFocus ? "text-mediumBlue border-mediumBlue  " : ""}`}
        {...props}
        value={isList ? selectedValue : value}
        onChange={onChange}
      ></input>
      <div
        className={`absolute top-2 sm:top-4 lg:top-3 left-3 sm:left-5 pt-0.5 bg-white  pointer-events-none  max-w-max transform duration-200 ease-linear${
          isFocus
            ? " -translate-y-5 sm:-translate-y-7 scale-[0.88] px-1 sm:px-2 z-[1111] text-mediumBlue"
            : ""
        }`}
      >
        {children}
      </div>
      {isList && isListOpen && (
        <label className=" w-full relative -top-3" id="list">
          {listOptions.map((option) => (
            <option
              className="h-10 w-full pl-5 bg-white text-mediumBlue font-bold cursor-pointer hover:bg-lightBlue hover:text-white"
              key={option}
              value={option}
              onClick={() => handleOptionOnClick(option)}
            >
              {option}
            </option>
          ))}
        </label>
      )}
    </div>
  );
}
InputField.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string || PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string,
  inputHeight: PropTypes.string,
  isList: PropTypes.bool,
  listOptions: PropTypes.array,
  listOnChange: PropTypes.func,
};

export default InputField;
