import axios from "axios";
import React, { useEffect, useState } from "react";
import PhotosUploder from "../components/PhotosUploder";
import { Navigate, useParams } from "react-router-dom";

function MakeEventPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [date, setDate] = useState("");
  const [maxGuests, setmaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) return;

    axios.get("/events/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setExperience(data.experience);
      setDate(data.date);
      setmaxGuests(data.maxGuests);
    });
  }, [id]);

  function handleExpClick(lvl) {
    const { checked, value } = lvl.target;
    if (checked) {
      setExperience((prevValue) => (prevValue === value ? "" : value));
    }
  }

  async function saveEvent(e) {
    e.preventDefault();
    const eventData = {
      title,
      address,
      addedPhotos,
      description,
      experience,
      date,
      maxGuests,
    };
    if (id) {
      ///update
      await axios.put("/events", {
        id,
        ...eventData,
      });
      setRedirect(true);
    } else {
      //new event
      await axios.post("/events", { ...eventData });
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/events" />;
  }
  return (
    <div>
      <form
        onSubmit={saveEvent}
        className="w-full rounded-xl border h-full m-2 p-3 shadow-md"
      >
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
        <PhotosUploder addedPhotos={addedPhotos} onChange={setAddedPhotos} />
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
              checked={experience.includes("junior")}
              name="junior"
            />
            <span>Początkujący</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={handleExpClick}
              value="mid"
              checked={experience.includes("mid")}
              name="mid"
            />
            <span>Średniozaawansowany</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={handleExpClick}
              value="senior"
              checked={experience.includes("senior")}
              name="senior"
            />
            <span>Zaawansowany</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={handleExpClick}
              value="prof"
              checked={experience.includes("prof")}
              name="prof"
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
              value={maxGuests}
              onChange={(e) => setmaxGuests(e.target.value)}
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
