import React, { useState } from "react";
import style from "../../../sass/main.module.scss";
import { CartPlus } from "react-bootstrap-icons";
//import style from "../../sass/main.scss";

const WidgetPrimary = (props) => {
  const [isShown,cartIsShown] = useState(false); 
  return (
    <div className={style.widgetPrimary}>
      <div className={style.widgetPrimary_top}>
        <div className={style.titlePrimary}>
          <h2 className={style.headingPrimary}>
            <span className={style["headingPrimary--main"]}>{props.title}</span>
          </h2>
        </div>
        <div>
        <span className={style.badge}>{props.totalItems}</span>
        <CartPlus size={30} className={style.cart} onClick = {props.addCart}
                onMouseEnter={() => cartIsShown(true)}
                onMouseLeave={() => cartIsShown(false)}
                ></CartPlus>
        </div>
      </div>
      {isShown &&
       (<div className={style.cartContent +
            " " +
            style["descriptionText"]}>
            <div>My Cart</div>
            <strong>{"$"+props.totalPrice}</strong>
            </div>
            )}   
      <img
        className={style.widgetPrimary_image}
        src={props.imageURL}
        alt="click me"
      ></img>

    </div>

  );
};

export default WidgetPrimary;
