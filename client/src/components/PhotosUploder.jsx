import React, { useState } from "react";
import axios from "axios";
export default function PhotosUploder({ addedPhotos, onChange }) {
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

  function uploadPhotos(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "mulipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  return (
    <>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="add using a link ...jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button onClick={addPhotoByLink} className="bg-blue-400 px-4 ">
          add&nbsp;photo
        </button>
      </div>
      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex" key={link}>
              <img
                className="rounded-lg w-full object-cover"
                src={"http://127.0.0.1:4000/uploads/" + link}
                alt=""
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer border bg-transparent rounded-2xl p-2 text-2xl flex justify-center items-center ">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhotos}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Uploud
        </label>
      </div>
    </>
  );
}
