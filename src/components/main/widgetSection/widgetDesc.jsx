import React from "react";
import PropTypes from "prop-types";
import style from "../../../sass/main.module.scss";

const WidgetDesc = (props) => {
  return (
    <div className={style.widgetDesc}>
      <p className={style.descriptionText}>
        {props.description}
     </p>
    </div>
  );
};

WidgetDesc.propTypes = {
  description: PropTypes.string.isRequired,
};

export default WidgetDesc;
