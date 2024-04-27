export const conversationFilter = (item, filterValue) => {
  const nameCondition = item.name
    .toLowerCase()
    .includes(filterValue.toLowerCase());

  const surnameCondition = item.surname
    .toLowerCase()
    .includes(filterValue.toLowerCase());

  return nameCondition || surnameCondition;
};
