import { useMemo } from "react";

export const useFilter = (items, filterValue, filterFunction) => {
  return useMemo(() => {
    return items?.filter((item) => filterFunction(item, filterValue));
  }, [items, filterValue, filterFunction]);
};
