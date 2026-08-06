import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "../../../sass/main.module.scss";
import { CartPlus } from "react-bootstrap-icons";
import CartDrawer from "./cartDrawer";
import { cartItemShape } from "../../../types/widget";

const WidgetPrimary = (props) => {
  const [isCartOpen, setCartOpen] = useState(false);
  return (
    <div className={style.widgetPrimary}>
      <div className={style.widgetPrimary_top}>
        <div className={style.titlePrimary}>
          <h2 className={style.headingPrimary}>
            <span className={style["headingPrimary--main"]} data-testid="widget-detail-title">{props.title}</span>
          </h2>
        </div>
        <div className={style.cartControls}>
        <button
          type="button"
          className={style.cartCountButton}
          data-testid="cart-toggle"
          onClick={() => setCartOpen((open) => !open)}
          aria-expanded={isCartOpen}
          aria-label="View cart"
        >
          <span className={style.badge} data-testid="cart-count">{props.totalItems}</span>
        </button>
        <CartPlus size={30} className={style.cart} data-testid="add-to-cart-button" onClick = {props.addCart}
                aria-label={`Add ${props.title} to cart`}
                ></CartPlus>
        </div>
      </div>
      {isCartOpen && (
        <CartDrawer
          items={props.cartItems}
          totalPrice={props.totalPrice}
          onClose={() => setCartOpen(false)}
          onRemove={props.removeFromCart}
          onIncrement={props.incrementCartItem}
          onDecrement={props.decrementCartItem}
        />
      )}
      <img
        className={style.widgetPrimary_image}
        src={props.imageURL}
        alt={props.title}
      ></img>

    </div>

  );
};

WidgetPrimary.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  addCart: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  cartItems: PropTypes.arrayOf(cartItemShape).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  incrementCartItem: PropTypes.func.isRequired,
  decrementCartItem: PropTypes.func.isRequired,
};

export default WidgetPrimary;
