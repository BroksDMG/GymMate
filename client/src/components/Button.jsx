import PropTypes from "prop-types";

const Button = ({
  children,
  bgColor = "bg-darkBluePrimary",
  boxShadowColor = "rgb(53 71 125)",
  style,
  padding = "px-5 py-2",
  textSize = "text-base",
  ...props
}) => {
  return (
    <div className="relative w-full">
      <button
        {...props}
        style={{ boxShadow: `0px 5px 0px ${boxShadowColor} ` }}
        className={`${style} ${bgColor} uppercase w-full rounded-xl font-semibold min-h-[30px] lg:min-h-[40px] min-w-max ${padding}relative `}
      >
        <span
          className={`${textSize} min-w-max text-white flex items-center justify-center`}
        >
          {children}
        </span>
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
  style: PropTypes.string,
  boxShadowColor: PropTypes.string,
  padding: PropTypes.string,
  textSize: PropTypes.string,
};
