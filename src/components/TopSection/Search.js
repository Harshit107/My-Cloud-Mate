// Search.js
import SearchInput from "../../Util/SearchInput";
import { useContext, useEffect, useState } from 'react';
import availableFilesContext from '../../store/file-context';

const Search = () => {
  const [searchValue, setSearchValue]  = useState('');
  const ctx = useContext(availableFilesContext);
  const activeProjectId = ctx.activeProjectId;


  useEffect(()=> {
    setSearchValue('')
  }, [activeProjectId])
 
  const handleInputValueChange = (value) => {
    ctx.searchFiles(value)
    setSearchValue(value)
  };

  return <SearchInput onInputChange={handleInputValueChange} value={searchValue} disabled={false}/>;
};

export default Search;
