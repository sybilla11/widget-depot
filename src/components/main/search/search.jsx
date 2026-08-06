import React from "react";
import PropTypes from "prop-types";
import style from "../../../sass/components/module/search.module.scss";
import { Search } from "react-bootstrap-icons";

const SearchBar = (props) => {
  return (

    <div className={style.searchBar}>
      <label htmlFor="widget-search" className={style.searchBar_label}>
        {props.placeholderValue}
      </label>
      <input
        id="widget-search"
        className={style.searchBar_searchInput}
        type="text"
        placeholder={props.placeholderValue}
        onChange={(e)=>props.onInputChange(e)}
      ></input>
      <Search size = {25} className={style.searchBar_searchIcon} ></Search>
    </div>
  );
};

SearchBar.propTypes = {
  placeholderValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default SearchBar;
