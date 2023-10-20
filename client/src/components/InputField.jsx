import { useState } from "react";

export default function InputField({ children }) {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div
      onFocus={() => setIsFocus(true)}
      className={`  text-lightBlue border-lightBlue font-medium  text-xl min-w-[150px] relative mt-4 transform duration-200 ease-linear
    hover:border-darkBluePrimary hover:text-darkBluePrimary active:text-mediumBlue
    `}
    >
      <input
        onBlur={() => setIsFocus(value.length > 0 ? true : false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`border-[3px] rounded-l-xl h-12 p-4 border-inherit w-full focus-visible:outline-none
      hover:border-inherit ${
        isFocus ? "text-mediumBlue border-mediumBlue  " : ""
      }`}
      ></input>
      <div
        className={`relative bottom-10 left-5 pt-0.5 rounded-md bg-white  pointer-events-none  max-w-max transform duration-200 ease-linear${
          isFocus
            ? "translate-x-10 -translate-y-6 scale-[0.88] px-2 z-[1111] text-mediumBlue"
            : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
