import React from "react";
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

export default WidgetDesc;
