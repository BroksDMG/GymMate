import EventListElement from "./EventListElement";
import propTypes from "prop-types";
function UserEventsList({ userEventsList }) {
  return (
    <>
      {userEventsList?.length > 0 &&
        userEventsList?.map((event, key) => (
          <EventListElement key={key} event={event} />
        ))}
      ;
    </>
  );
}

export default UserEventsList;

UserEventsList.propTypes = {
  userEventsList: propTypes.array,
};
