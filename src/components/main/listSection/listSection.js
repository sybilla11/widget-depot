import React from "react";
import style from "../../../sass/components/module/listSection.module.scss";
import Widget from "../listSection/widgetThumbnail/widgetThumbnail";

const ListSection = (props) => {
  let widgets = [];
  
  if (props.widgetList) {
    widgets = props.widgetList.map((widget) => {
     return <Widget 
      key = {widget.id}
      title = {widget.title}
      price = {widget.price}
      change = {() => props.currentWidget(widget.id)}></Widget>
    });
  }else{
    widgets = <div>no Content to Display</div>
  };
  return (
    <div className={style.widgetItemList}>
      {widgets}
    </div>
  );
};

export default ListSection;
