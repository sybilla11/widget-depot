import React from "react";
import style from "../../../../sass/main.module.scss";
import {ChevronRight} from "react-bootstrap-icons";

const Widget = (props) => {
  return ( 
  <div className={style.widgetThumbnail} onClick={props.change}>
    <div className={style["specsTitle--sub"]}>
        <h2>{props.title}</h2>
        <h4>price</h4>
        <span>{"$"+props.price}</span>
    </div>
    <ChevronRight size={30} className={style.widgetThumbnail_arrow}></ChevronRight>
  </div>
  );
};

export default Widget;
