// Search.js
import SearchInput from "../../Util/SearchInput";
import { useContext } from 'react';
import availableFilesContext from '../../store/file-context';

const Search = (props) => {

  const ctx = useContext(availableFilesContext);

  const handleInputValueChange = (value) => {
    ctx.searchFiles(value)
  };

  return <SearchInput onInputChange={handleInputValueChange} />;
};

export default Search;
