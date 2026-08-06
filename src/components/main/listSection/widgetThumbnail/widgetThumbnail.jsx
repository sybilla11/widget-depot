import React from "react";
import PropTypes from "prop-types";
import style from "../../../../sass/main.module.scss";
import {ChevronRight} from "react-bootstrap-icons";

const Widget = (props) => {
  const className = props.selected
    ? `${style.widgetThumbnail} ${style["widgetThumbnail--selected"]}`
    : style.widgetThumbnail;
  return (
  <button type="button" className={className} onClick={props.change} aria-pressed={props.selected}>
    <div className={style["specsTitle--sub"]}>
        <h2>{props.title}</h2>
        <h4>price</h4>
        <span>{"$"+props.price}</span>
    </div>
    <ChevronRight size={30} className={style.widgetThumbnail_arrow}></ChevronRight>
  </button>
  );
};

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  change: PropTypes.func.isRequired,
};

Widget.defaultProps = {
  selected: false,
};

export default Widget;
