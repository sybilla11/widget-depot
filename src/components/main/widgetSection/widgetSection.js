import React from "react";
import style from "../../../sass/main.module.scss";
import WidgetPrimary from "./widgetPrimary";
import WidgetSpecs from "./widgetSpecs";
import WidgetDesc from "./widgetDesc";

const WidgetSection = (props) => {
  
  return (
    <div className={style.widgetSection}>
      <WidgetPrimary imageURL = {props.widget.imageURL} 
                    title = {props.widget.title} 
                    addCart = {() => {props.purchaseHandler(props.widget.price)}} 
                    totalItems = {props.totalItems}
                    totalPrice = {props.totalPrice}>Widget Primary</WidgetPrimary>
      <WidgetSpecs dimension = {props.widget.specifications.dimensions.length+"\" X "+
                    props.widget.specifications.dimensions.width+"\" X "+
                    props.widget.specifications.dimensions.height+"\""}
                    weight = {props.widget.specifications.weight.qty}
                    capacity = {props.widget.specifications.capacity.qty}></WidgetSpecs>
      <WidgetDesc description = {props.widget.description}></WidgetDesc>
    </div>
  );
};

export default WidgetSection;
