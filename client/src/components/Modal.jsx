import PropTypes from "prop-types";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-gray-200 rounded-lg relative p-6 max-w-lg mx-auto">
        <button onClick={onClose} className="absolute right-2 top-2 text-2xl">
          ×
        </button>
        <div className="text-center">{children}</div>
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
