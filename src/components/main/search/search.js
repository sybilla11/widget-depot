import React from "react";
import style from "../../../sass/components/module/search.module.scss";
import { Search } from "react-bootstrap-icons";

const SearchBar = (props) => {
  return (

    <div className={style.searchBar}>
      <input
        className={style.searchBar_searchInput}
        type="text"
        placeholder="Find the widget of your dreams"
        onChange={(e)=>props.onInputChange(e)}
      ></input>
      <Search size = {25} className={style.searchBar_searchIcon} ></Search>
    </div>
  );
};

export default SearchBar;
