// Search.js
import SearchInput from "../Util/SearchInput";

const Search = (props) => {
  const handleInputValueChange = (value) => {
    console.log("Input value:", value);
  };

  return <SearchInput onInputChange={handleInputValueChange} />;
};

export default Search;
