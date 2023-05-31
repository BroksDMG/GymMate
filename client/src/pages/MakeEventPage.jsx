import axios from "axios";
import React, { useState } from "react";

function MakeEventPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [date, setDate] = useState("");
  const [numberGuests, setNumberGuests] = useState(1);

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
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
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  function handleExpClick(lvl) {
    const { value } = lvl.target;
    setExperience((prevValue) => (prevValue === value ? "" : value));
  }
  return (
    <div>
      <form className="w-full rounded-xl border h-full m-2 p-3 shadow-md">
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          Tytuł powinien być krótki i chwytliwy
        </p>
        <input
          type="text"
          placeholder="title, for example: dear GymMate users"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Address</h2>
        <p className="text-gray-500 text-sm">lokacja wydarzenia</p>
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Photo</h2>
        <p className="text-gray-500 text-sm">
          dodaj obraz który przyciągnie uwagę
        </p>
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
              <div className="h-32 flex">
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
        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm">Opis wydarzenia</p>
        <textarea
          type="text"
          placeholder="title, for example: dear GymMate users"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Experience</h2>
        <p className="text-gray-500 text-sm">
          Zaznacz swoj poziom zaawansowania
        </p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={handleExpClick}
              value="junior"
              checked={experience === "junior"}
            />
            <span>Początkujący</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={handleExpClick}
              value="mid"
              checked={experience === "mid"}
            />
            <span>Średniozaawansowany</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={handleExpClick}
              value="senior"
              checked={experience === "senior"}
            />
            <span>Zaawansowany</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={handleExpClick}
              value="prof"
              checked={experience === "prof"}
            />
            <span>Profesjonalista</span>
          </label>
        </div>
        <h2 className="text-2xl mt-4">Date&Number</h2>
        <p className="text-gray-500 text-sm">
          zaznacz kiedy i z iloma osobami chesz zorganizować spotkanie
        </p>
        <div className="flex mt-2 gap-5">
          <div className="flex flex-col">
            <h3 className="text-lg ">Kiedy?</h3>
            <input
              type="date"
              placeholder="title, for example: dear GymMate users"
              className=" border p-4 rounded-lg text-2xl"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg ">Ile osób?</h3>
            <input
              type="number"
              className="border p-4 rounded-lg text-2xl"
              value={numberGuests}
              onChange={(e) => setNumberGuests(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5">
          <button className="w-full bg-blue-500">Save</button>
        </div>
      </form>
    </div>
  );
}

export default MakeEventPage;
