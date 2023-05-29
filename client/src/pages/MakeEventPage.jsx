import React from "react";

function MakeEventPage() {
  return (
    <div>
      <form className="w-full rounded-xl border h-full m-2 p-3 shadow-md">
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          Tyyuł powinien być krótki i chwytliwy
        </p>
        <input
          type="text"
          placeholder="title, for example: dear GymMate users"
        />
        <h2 className="text-2xl mt-4">Address</h2>
        <p className="text-gray-500 text-sm">lokacja wydarzenia</p>
        <input type="text" placeholder="address" />
        <h2 className="text-2xl mt-4">Photo</h2>
        <p className="text-gray-500 text-sm">
          dodaj obraz który przyciągnie uwagę
        </p>
        <div className="flex gap-3">
          <input type="text" placeholder="add using a link ...jpg" />
          <button className="bg-orange-300 px-4 ">add&nbsp;photo</button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <button className="border bg-transparent rounded-2xl p-6 text-2xl flex justify-center items-center ">
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
          </button>
        </div>
        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm">Opis wydarzenia</p>
        <textarea
          type="text"
          placeholder="title, for example: dear GymMate users"
        />
        <h2 className="text-2xl mt-4">Experience</h2>
        <p className="text-gray-500 text-sm">
          Zaznacz swoj poziom zaawansowania
        </p>
        <div className="grid grid-cols-2 gap-2">
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input type="checkbox" />
            <span>Początkujący</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input type="checkbox" />
            <span>Średniozaawansowany</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input type="checkbox" />
            <span>Zaawansowany</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input type="checkbox" />
            <span>Profesjonalista</span>
          </label>
        </div>
      </form>
    </div>
  );
}

export default MakeEventPage;
