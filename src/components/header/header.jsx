import React from "react";
import style from "../../sass/main.module.scss";

const Header = () => {
  return (
  <div className={style.header}>
  <div className={style.header_content}>
    <h1 className = {style["appTitle"]}>Widget Depot</h1>
    </div>
    </div>
  );
};

export default Header;
