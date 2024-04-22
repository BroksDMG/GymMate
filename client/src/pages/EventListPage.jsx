import { useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { useContext } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import logoWithBorder from "../assets/logoWithBorder.svg";
import Button from "../components/Button";
import InputField from "../components/InputField";
import DateInputField from "../components/DateInputField";
import EventListElement from "../components/EventListElement";

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [showSortForm, setShowSortForm] = useState(false);
  const [serchValue, setSerchValue] = useState("");
  const [searchedEvents, setSearchedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    axios.get("/events").then(({ data }) => {
      setEvents(data);
    });
  }, []);
  const handleSubmit = (values) => {
    const filteredEvents = events?.filter((event) => {
      const addressCondition =
        !values.address ||
        event.address.toLowerCase().includes(values.address.toLowerCase());

      const guestsCondition =
        !values.guestNumber ||
        Number(event.maxGuests) <= Number(values.guestNumber);

      const dateCondition =
        (!values.startingDate || event.time >= values.startingDate) &&
        (!values.endingDate || event.time <= values.endingDate);

      const experienceCondition =
        !values.experience || event.experience.includes(values.experience);

      return (
        addressCondition &&
        guestsCondition &&
        dateCondition &&
        experienceCondition
      );
    });
    setFilteredEvents(filteredEvents);
  };
  const handleSearch = (searchValue) => {
    setSerchValue(searchValue);
    if (searchValue.length < 3) {
      setSearchedEvents([]);
      return;
    }
    const filteredEvent = events?.filter((event) =>
      event.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchedEvents(filteredEvent);
  };

  const clearFilters = () => {
    setFilteredEvents([]);
  };
  const initialSortValues = {
    guestNumber: "",
    startingDate: "",
    endingDate: "",
    experience: "",
    address: "",
  };
  const sortValidationSchema = Yup.object().shape({
    guestNumber: Yup.number().min(0).max(100).integer(),
    startingDate: Yup.date(),
    endingDate: Yup.date(),
    experience: Yup.string(),
    address: Yup.string(),
  });

  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-2 sm:px-10 md:px-20 lg:px-10 xl:px-20">
      <div className=" flex  items-center flex-col lg:justify-normal lg:flex-row lg:items-start lg:mb-10">
        <a href="#" className="absolute -top-20  lg:-top-32 select-none ">
          <img
            src={logoWithBorder}
            alt="logoBorder"
            className="w-52 lg:w-full "
          />
        </a>
        <div className="flex items-center flex-col mt-20 lg:mt-0 w-full lg:flex-row-reverse lg:pl-80">
          <InputField
            value={serchValue}
            onChange={(e) => handleSearch(e.target.value)}
          >
            Search
          </InputField>
          <div className="flex gap-5 lg:mr-5 mt-5 translate-y-5 lg:mt-0 lg:translate-y-2 w-64 sm:w-96 justify-center">
            <Link className="w-full" to={"/events/new"}>
              <Button style="bg-darkBluePrimary">Add new</Button>
            </Link>
            <Button
              onClick={() => setShowSortForm((e) => !e)}
              style="bg-darkBluePrimary"
            >
              Sort
            </Button>
          </div>
        </div>
      </div>
      <Formik
        initialValues={initialSortValues}
        validationSchema={sortValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, setFieldValue }) => {
          function handleExpClick(value) {
            setFieldValue("experience", value);
          }
          return (
            <Form
              className={`flex flex-col items-center w-screen mt-5  -mx-2 sm:-mx-10 md:-mx-20 lg:-mx-10 xl:-mx-20  transition-all duration-700 ease-out transform ${
                showSortForm
                  ? "translate-y-0 opacity-100 visible"
                  : "-translate-y-10 opacity-0 invisible  "
              }`}
            >
              <section
                className={`flex flex-col items-screen w-full rounded-b-3xl pb-5 px-2 sm:px-10 md:px-20 lg:px-10 xl:px-20 shadow-xl shadow-gray-300 `}
              >
                <div className="flex w-full">
                  <InputField
                    name="address"
                    id="address"
                    onChange={handleChange}
                    error={errors.address}
                    value={values["address"]}
                  >
                    Address
                  </InputField>
                </div>
                <div className="flex flex-col sm:flex-row w-full gap-5">
                  <DateInputField
                    type="date"
                    name="startingDate"
                    id="startingDate"
                    onChange={handleChange}
                    error={errors.startingDate}
                    value={values["startingDate"]}
                  >
                    Starting Date
                  </DateInputField>
                  <DateInputField
                    type="date"
                    name="endingDate"
                    id="endingDate"
                    onChange={handleChange}
                    error={errors.endingDate}
                    value={values["endingDate"]}
                  >
                    Finishing Date
                  </DateInputField>
                </div>
                <div className="flex w-full  items-center gap-5 ">
                  <InputField
                    name="experience"
                    id="experience"
                    listOnChange={handleExpClick}
                    error={errors.experience}
                    isList={true}
                    listOptions={["Beginner", "Intermediate", "Advanced"]}
                  >
                    Experience
                  </InputField>
                  <InputField
                    name="guestNumber"
                    id="guestNumber"
                    onChange={handleChange}
                    error={errors.guestNumber}
                    value={values["guestNumber"]}
                  >
                    Max Guest
                  </InputField>
                </div>
                <div className="flex w-full justify-end mt-3 ">
                  <div className="flex w-full sm:w-1/2 sm:pl-3 gap-5">
                    <Button type="submit" style="bg-darkBluePrimary mt-1">
                      Add
                    </Button>
                    <Button
                      onClick={clearFilters}
                      style="bg-darkBluePrimary mt-1"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </section>
            </Form>
          );
        }}
      </Formik>

      <div
        className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 transition-all duration-500 ease-out transform ${
          showSortForm
            ? "translate-y-0 "
            : "sm:-translate-y-64 -translate-y-80 md:-translate-y-80 lg:-translate-y-[22rem] "
        }`}
      >
        {searchedEvents.length > 0
          ? searchedEvents.map((searchedEvent, key) => (
              <EventListElement event={searchedEvent} key={key} user={user} />
            ))
          : filteredEvents.length > 0
          ? filteredEvents.map((event, key) => (
              <EventListElement event={event} key={key} user={user} />
            ))
          : events
              .map((event, i) => (
                <EventListElement event={event} key={i} user={user} />
              ))
              .reverse()}
      </div>
    </div>
  );
}
