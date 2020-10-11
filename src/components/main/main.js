import React from "react";
import ListSection from "./listSection/listSection";
import SearchBar from "./search/search";
import WidgetSection from "./widgetSection/widgetSection";
import style from "../../sass/components/module/main.module.scss";

const Main = (props) => {
  let widgetSection ;
  if(props.widget != null){
    widgetSection = 
     <WidgetSection widget = {props.widget}
      purchaseHandler = {props.purchaseHandler}
      totalItems = {props.totalItems}
      totalPrice = {props.totalPrice}></WidgetSection>;
    
  }else{
    widgetSection = <div className={style.noContent}> No Widget Found</div>;
  };
  return (
    <div className={style.Main}>
      <SearchBar onInputChange = {props.searchTitle}></SearchBar>
      <div className={style.widgetFlexBox}>
        <ListSection widgetList = {props.widgetList} currentWidget = {props.widgetClicked}
        ></ListSection>
        {widgetSection}
      </div>
    </div>
  );
};

export default Main;
