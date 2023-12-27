import EventListElement from "./EventListElement";
import propTypes from "prop-types";
function UserEventsList({ UserEventsList }) {
  return (
    <>
      {UserEventsList?.length > 0 &&
        UserEventsList?.map((event, key) => (
          <EventListElement key={key} event={event} />
        ))}
      ;
    </>
  );
}

export default UserEventsList;

UserEventsList.propTypes = {
  UserEventsList: propTypes.array,
};
