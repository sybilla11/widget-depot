import React from "react";
import PropTypes from "prop-types";
import style from "../../../sass/main.module.scss";
import WidgetPrimary from "./widgetPrimary";
import WidgetSpecs from "./widgetSpecs";
import WidgetDesc from "./widgetDesc";
import { widgetShape, cartItemShape } from "../../../types/widget";

const WidgetSection = (props) => {
  
  return (
    <div className={style.widgetSection}>
      <WidgetPrimary imageURL = {props.widget.imageURL}
                    title = {props.widget.title}
                    addCart = {() => props.addToCart(props.widget.id)}
                    totalItems = {props.totalItems}
                    totalPrice = {props.totalPrice}
                    cartItems = {props.cartItems}
                    removeFromCart = {props.removeFromCart}
                    incrementCartItem = {props.addToCart}
                    decrementCartItem = {props.decrementCartItem}
                    onCheckout = {props.onCheckout}>Widget Primary</WidgetPrimary>
      <WidgetSpecs dimension = {props.widget.specifications.dimensions.length+"\" X "+
                    props.widget.specifications.dimensions.width+"\" X "+
                    props.widget.specifications.dimensions.height+"\""}
                    weight = {props.widget.specifications.weight.qty}
                    capacity = {props.widget.specifications.capacity.qty}></WidgetSpecs>
      <WidgetDesc description = {props.widget.description}></WidgetDesc>
    </div>
  );
};

WidgetSection.propTypes = {
  widget: widgetShape.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  decrementCartItem: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(cartItemShape).isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default WidgetSection;
