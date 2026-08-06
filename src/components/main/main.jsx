import React from "react";
import PropTypes from "prop-types";
import ListSection from "./listSection/listSection";
import SearchBar from "./search/search";
import WidgetSection from "./widgetSection/widgetSection";
import style from "../../sass/components/module/main.module.scss";
import { widgetShape, cartItemShape } from "../../types/widget";

const Main = (props) => {
  const noSearchResults = !!props.searchTerm && props.widgetList.length === 0;

  let body;
  if (noSearchResults) {
    body = (
      <div className={style.noResults}>
        <p className={style.noResults_title} data-testid="no-results-message">
          {`No widgets match "${props.searchTerm}"`}
        </p>
        <p className={style.noResults_hint}>Try a different search term.</p>
      </div>
    );
  } else {
    let widgetSection;
    if (props.widget != null) {
      widgetSection = (
        <WidgetSection widget = {props.widget}
          addToCart = {props.addToCart}
          removeFromCart = {props.removeFromCart}
          decrementCartItem = {props.decrementCartItem}
          onCheckout = {props.onCheckout}
          cartItems = {props.cartItems}
          totalItems = {props.totalItems}
          totalPrice = {props.totalPrice}></WidgetSection>
      );
    } else {
      widgetSection = <div className={style.noWidgetSelected}>Select a widget to see its details</div>;
    }
    body = (
      <div className={style.widgetFlexBox}>
        <ListSection widgetList = {props.widgetList} currentWidget = {props.widgetClicked}
          selectedId = {props.widget ? props.widget.id : null}
        ></ListSection>
        {widgetSection}
      </div>
    );
  }

  return (
    <div className={style.Main}>
      <SearchBar placeholderValue = "Find the widget of your dreams" onInputChange = {props.searchTitle}></SearchBar>
      {body}
    </div>
  );
};

Main.propTypes = {
  widgetList: PropTypes.arrayOf(widgetShape).isRequired,
  widget: widgetShape,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  decrementCartItem: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(cartItemShape).isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  widgetClicked: PropTypes.func.isRequired,
  searchTitle: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

Main.defaultProps = {
  widget: null,
  searchTerm: "",
};

export default Main;
