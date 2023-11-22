import axios from "axios";
import { useEffect, useState } from "react";
import PhotosUploder from "../components/PhotosUploder";
import { Navigate, useParams } from "react-router-dom";
import Stars from "../components/Stars";
import logoWithBorder from "../assets/logoWithBorder.svg";
import { AiFillPlusCircle } from "react-icons/ai";
import InputField from "../components/InputField";
import Button from "../components/Button";

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
  const [rating, setRating] = useState(0);
  const [temRating, setTemRating] = useState(0);
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

  const messageArr = ["Beginner", "Intermediate", "Proffesional"];

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
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-10 lg:px-32">
      <form
        className=" flex  items-center flex-col lg:justify-normal lg:flex-col lg:items-start lg:mb-10"
        onSubmit={saveEvent}
      >
        <a href="#" className="absolute -top-20  lg:-top-32 ">
          <img
            src={logoWithBorder}
            alt="logoBorder"
            className="w-52 lg:w-full "
          />
        </a>
        <div className="flex flex-col mt-20 lg:mt-32 w-full border-2 rounded-2xl relative ">
          <div className=" bg-lightBrown w-full h-32 rounded-t-2xl flex justify-center items-center text-8xl relative">
            <AiFillPlusCircle className="absolute z-10 text-lightBrown" />
            <AiFillPlusCircle className="relative top-1 blur-sm text-gray-600" />
            {/* <PhotosUploder addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}
          </div>
          <div className="flex-col items-center px-16">
            <div className=" absolute top-20 flex justify-center items-center w-[105px] h-[105px] bg-white rounded-full  ">
              <img
                src="https://img.freepik.com/free-photo/elf-woman-forest_71767-117.jpg?w=826&t=st=1699015819~exp=1699016419~hmac=74e1f2bd99b8e2de4489799ab8476301c1747e33fbb6fb1d6da863b5c6230ca6"
                alt="profileImg"
                className="w-24 h-24 rounded-full object-cover object-center top-4 "
              />
            </div>
            <p className="text-gray-500 text-sm">
              Tytuł powinien być krótki i chwytliwy
            </p>
            <InputField
              type="text"
              placeholder="title, for example: dear GymMate users"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">lokacja wydarzenia</p>
            <InputField
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

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
              <Stars
                quantity={3}
                high={"100"}
                setRatingOutComponent={setRating}
                setTempRatingOutComponent={setTemRating}
              />
              <div className="flex flex-col items-center justify-center">
                {messageArr[temRating ? temRating - 1 : rating - 1]}
              </div>
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
                <InputField
                  type="date"
                  placeholder="title, for example: dear GymMate users"
                  className=" border p-4 rounded-lg text-2xl"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg ">Ile osób?</h3>
                <InputField
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default MakeEventPage;
