import { useState } from "react";

export default function InputField({ children, ...props }) {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div
      onFocus={() => setIsFocus(true)}
      className={`w-full h-[40px] lg:h-[60px] text-lightBlue border-lightBlue font-medium  text-base lg:text-xl min-w-[140px] relative mt-6 transform duration-200 ease-linear
    hover:border-darkBluePrimary hover:text-darkBluePrimary active:text-mediumBlue
    `}
    >
      <input
        {...props}
        onBlur={() => setIsFocus(value.length > 0 ? true : false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`border-[2px] rounded-l-xl h-11 lg:h-14 p-4 border-inherit w-full focus-visible:outline-none
      hover:border-inherit ${
        isFocus ? "text-mediumBlue border-mediumBlue  " : ""
      }`}
      ></input>
      <div
        className={`relative bottom-9 lg:bottom-11 left-5 pt-0.5 bg-white  pointer-events-none  max-w-max transform duration-200 ease-linear${
          isFocus
            ? "translate-x-10 -translate-y-5 lg:-translate-y-7 scale-[0.88] px-2 z-[1111] text-mediumBlue"
            : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
