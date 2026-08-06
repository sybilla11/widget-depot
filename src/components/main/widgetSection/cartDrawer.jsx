import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "../../../sass/main.module.scss";
import { Dash, Plus, Trash, X } from "react-bootstrap-icons";
import { cartItemShape } from "../../../types/widget";

const CartDrawer = (props) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    props.onCheckout();
    setOrderPlaced(true);
  };

  let body;
  if (orderPlaced) {
    body = (
      <div className={style.cartDrawer_confirmation} data-testid="order-confirmation">
        Order placed! Thanks for shopping with Widget Depot.
      </div>
    );
  } else if (props.items.length === 0) {
    body = <div className={style.cartDrawer_empty}>Your cart is empty</div>;
  } else {
    body = (
      <>
        <ul className={style.cartDrawer_list}>
          {props.items.map((item) => (
            <li key={item.id} className={style.cartDrawer_item}>
              <div className={style.cartDrawer_itemInfo}>
                <span className={style.cartDrawer_itemTitle}>{item.title}</span>
                <span className={style.cartDrawer_itemPrice}>{"$" + item.lineTotal}</span>
              </div>
              <div className={style.cartDrawer_itemControls}>
                <button
                  type="button"
                  aria-label={`Decrease ${item.title} quantity`}
                  onClick={() => props.onDecrement(item.id)}
                >
                  <Dash size={14} />
                </button>
                <span data-testid={`qty-${item.id}`}>{item.qty}</span>
                <button
                  type="button"
                  aria-label={`Increase ${item.title} quantity`}
                  onClick={() => props.onIncrement(item.id)}
                >
                  <Plus size={14} />
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${item.title} from cart`}
                  onClick={() => props.onRemove(item.id)}
                >
                  <Trash size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className={style.cartDrawer_total}>
          <strong>{"Total: $" + props.totalPrice}</strong>
        </div>
        <button
          type="button"
          className={style.cartDrawer_checkout}
          data-testid="checkout-button"
          onClick={handlePlaceOrder}
        >
          Place order
        </button>
      </>
    );
  }

  return (
    <div className={style.cartDrawer} data-testid="cart-drawer">
      <div className={style.cartDrawer_header}>
        <span>My Cart</span>
        <button
          type="button"
          className={style.cartDrawer_close}
          onClick={props.onClose}
          aria-label="Close cart"
        >
          <X size={20} />
        </button>
      </div>
      {body}
    </div>
  );
};

CartDrawer.propTypes = {
  items: PropTypes.arrayOf(cartItemShape).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default CartDrawer;
