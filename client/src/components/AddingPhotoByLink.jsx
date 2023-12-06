import { useState } from "react";
import axios from "axios";
import propTypes from "prop-types";

function AddingPhotoByLink({ onChange }) {
  const [photoLink, setPhotoLink] = useState("");
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }
  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="add using a link ...jpg"
        value={photoLink}
        onChange={(e) => setPhotoLink(e.target.value)}
      />
      <button onClick={(e) => addPhotoByLink(e)} className="bg-blue-400 px-4 ">
        add&nbsp;photo
      </button>
    </div>
  );
}
AddingPhotoByLink.propTypes = {
  onChange: propTypes.func,
};
export default AddingPhotoByLink;
