import React from "react";
import PropTypes from "prop-types";
import style from "../../../sass/components/module/listSection.module.scss";
import Widget from "../listSection/widgetThumbnail/widgetThumbnail";
import { widgetShape } from "../../../types/widget";

const ListSection = (props) => {
  const widgets = props.widgetList.map((widget) => (
    <Widget
      key={widget.id}
      title={widget.title}
      price={widget.price}
      selected={widget.id === props.selectedId}
      change={() => props.currentWidget(widget.id)}
    ></Widget>
  ));

  return (
    <div className={style.widgetItemList}>
      {widgets}
    </div>
  );
};

ListSection.propTypes = {
  widgetList: PropTypes.arrayOf(widgetShape).isRequired,
  currentWidget: PropTypes.func.isRequired,
  selectedId: PropTypes.number,
};

ListSection.defaultProps = {
  selectedId: null,
};

export default ListSection;
