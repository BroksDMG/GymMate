import PropTypes from "prop-types";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className=" rounded flex fixed justify-center items-center w-full h-full">
      <div className="bg-lightBrown text-black text-center text-2xl font-bold relative">
        <button onClick={onClose} className="float-right">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
