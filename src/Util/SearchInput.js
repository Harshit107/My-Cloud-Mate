import classes from "./SearchInput.module.css";
import React from "react";

const SearchInput = (props) => {
   
  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    if (props.onInputChange) {
      props.onInputChange(inputValue);
    }
  };

  return (
    <input
      type="text"
      className={classes["search-input"]}
      placeholder="Search"
      onChange={handleSearchInputChange}
    />
  );
};

export default SearchInput;
