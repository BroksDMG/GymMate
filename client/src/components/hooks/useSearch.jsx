// useSearch.js
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export const useSearch = (searchValue, filteredItems) => {
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchValue = useDebounce(searchValue, 400);

  useEffect(() => {
    if (debouncedSearchValue.length < 3) {
      setSearchResults([]);
      return;
    }
    setSearchResults(filteredItems);
  }, [debouncedSearchValue, filteredItems]);

  return searchResults;
};
