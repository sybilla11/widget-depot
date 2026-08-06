import React from "react";
import style from "../../sass/main.module.scss";
import { PersonCircle } from "react-bootstrap-icons";

const Header = (props) => {
  return (
  <div className={style.header}>
  <div className={style.header_content}>
    <h1 className = {style["appTitle"]}>Widget Depot</h1>
    <div className={style.header_content_userLogo}>
        <PersonCircle  size={30}></PersonCircle></div>
    </div>
    </div>
  );
};

export default Header;
