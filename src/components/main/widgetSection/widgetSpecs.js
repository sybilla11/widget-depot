import React from "react";
import style from "../../../sass/main.module.scss";

const WidgetSpecs = (props) => {
  return (
    <div className={style.widgetSpec}>
      <div className={style.widgetSpec_titlePrimary}>
        <h2 className={style.specsTitle}>Specifications</h2>
      </div>
      <div className={style.widgetSpec_flexbox}>
        <div className={style.widgetSpec_flexItem}>
          <span className={style["specsTitle--subData"]}>
            {props.dimension}
          </span>
          <span className={style["specsTitle--sub"]}>Dimensions</span>
        </div>
        <div className={style.widgetSpec_flexItem}>
          <span className={style["specsTitle--subData"]}>{props.weight}</span>
          <span className={style["specsTitle--sub"]}>Weight</span>
        </div>
        <div className={style.widgetSpec_flexItem}>
          <span className={style["specsTitle--subData"]}>{props.capacity}</span>
          <span className={style["specsTitle--sub"]}>Capacity</span>
        </div>
      </div>
    </div>
  );
};

export default WidgetSpecs;
