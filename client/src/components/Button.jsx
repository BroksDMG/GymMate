import PropTypes from "prop-types";

const Button = ({ children, bgColor = "bg-blue-900", style, ...props }) => {
  return (
    <div className="relative w-full">
      <button
        {...props}
        className={`${style} uppercase w-full rounded-xl font-bold min-h-[30px] lg:min-h-[40px] min-w-max px-5 py-2 relative  z-10 `}
      >
        <span className="z-10 min-w-max text-white flex items-center justify-center">
          {children}
        </span>
      </button>
      <button
        className={`z-0 ${bgColor} w-full rounded-xl font-bold min-h-[30px] lg:min-h-[40px] min-w-max px-3 py-2 absolute text-xs -translate-x-full  translate-y-[3px]`}
      >
        <span className="z-10 min-w-max text-transparent flex">{children}</span>
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
  style: PropTypes.string,
};
