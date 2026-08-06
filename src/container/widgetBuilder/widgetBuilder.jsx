import React, { Component } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import Main from "../../components/main/main";
import Aux from "../../hoc/Aux";
import axios from "axios";
import style from "../../sass/main.module.scss";
// import WidgetSection from "../../components/main/widgetSection/widgetSection"

const CART_STORAGE_KEY = "widget-depot-cart";

function loadCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function withRouter(WrappedComponent) {
  return function ComponentWithRouterProps(props) {
    const params = useParams();
    const navigate = useNavigate();
    return <WrappedComponent {...props} params={params} navigate={navigate} />;
  };
}

class WidgetBuilder extends Component {
  state = {
    widgetsLoaded: false,
    widgets: [],
    searchWidget: "",
    error: null,
    cart: loadCart(),
  };

  componentDidMount() {
    axios
      .get("data/data.json")
      .then((response) => {
        const widgets = response.data.widgets;
        this.setState({
          widgets: widgets,
          widgetsLoaded: true,
        });
        if (!this.props.params.id && widgets.length > 0) {
          this.props.navigate(`/widgets/${widgets[0].id}`, { replace: true });
        }
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      try {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.state.cart));
      } catch {
        // localStorage may be unavailable (private mode, quota) — cart still works in-memory
      }
    }
  }

  onWidgetClickHandler = (id) => {
    this.props.navigate(`/widgets/${id}`);
  };

  handleOnInputChange = (event) => {
    this.setState({ searchWidget: event.target.value });
  };

  addToCart = (id) => {
    this.setState((prevState) => {
      const existing = prevState.cart.find((item) => item.id === id);
      const cart = existing
        ? prevState.cart.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prevState.cart, { id, qty: 1 }];
      return { cart };
    });
  };

  decrementCartItem = (id) => {
    this.setState((prevState) => ({
      cart: prevState.cart
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    }));
  };

  removeFromCart = (id) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((item) => item.id !== id),
    }));
  };

  render() {
    const { widgets, searchWidget, widgetsLoaded, error, cart } = this.state;
    const routeId = this.props.params.id != null ? Number(this.props.params.id) : null;
    const widget = routeId != null ? widgets.find((item) => item.id === routeId) ?? null : null;

    const filteredWidget = widgets.filter((widget) =>
      widget.title.toLowerCase().includes(searchWidget.toLowerCase())
    );
    const visibleWidget =
      widget != null && filteredWidget.some((item) => item.id === widget.id)
        ? widget
        : null;

    const cartItems = cart
      .map((entry) => {
        const widgetDetails = widgets.find((item) => item.id === entry.id);
        return widgetDetails
          ? { ...widgetDetails, qty: entry.qty, lineTotal: widgetDetails.price * entry.qty }
          : null;
      })
      .filter(Boolean);
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

    let widgetData;
    if (error) {
      widgetData = (
        <div className={style.noContent}>
          Failed to load widgets. Please try again later.
        </div>
      );
    } else if (!widgetsLoaded) {
      widgetData = <div className={style.noContent}>Loading widgets…</div>;
    } else if (widget != null || filteredWidget.length !== 0) {
      widgetData = (
        <Main
          widgetList={filteredWidget}
          widget={visibleWidget}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
          decrementCartItem={this.decrementCartItem}
          widgetClicked={this.onWidgetClickHandler}
          searchTitle={this.handleOnInputChange}
          searchTerm={searchWidget}
          cartItems={cartItems}
          totalItems={totalItems}
          totalPrice={totalPrice}
        ></Main>
      );
    } else {
      widgetData = <div className={style.noContent}>no Widgets to Display</div>;
    }

    return (
      <Aux>
        <Header></Header>
        {widgetData}
      </Aux>
    );
  }
}

WidgetBuilder.propTypes = {
  params: PropTypes.shape({ id: PropTypes.string }).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default withRouter(WidgetBuilder);
