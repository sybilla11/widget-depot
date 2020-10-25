import React, { Component } from "react";
import Header from "../../components/header/header";
import Main from "../../components/main/main";
import Aux from "../../hoc/Aux";
import axios from "axios";
import style from "../../sass/main.module.scss";
// import WidgetSection from "../../components/main/widgetSection/widgetSection"

class WidgetBuilder extends Component {
  state = {
    widget: null,
    onLoadWidgets:false,
    filterWidget:null,
    widgets: [],
    searchWidget:'',
    //filterList:[],
    error: null,
    totalPrice:0,
    totalItems:0
  };


  componentDidMount() {
    axios
      .get("data/data.json")
      .then((response) => {
        this.setState({
          widgets: response.data.widgets,
          widget: response.data.widgets[0],
          onLoadWidgets: true
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }
    
  onWidgetClickHandler = (id) => {
    var newWidget = this.state.widgets.filter(function(item) {
      return item.id === id;
    });
    console.log(newWidget[0]);
    this.setState({ widget: newWidget[0] });
  };

  handleOnInputChange = (event) => {
  this.setState({searchWidget: event.target.value});
  };

  purchaseHandler = (price) => {
    console.log(price);
    const newPrice = this.state.totalPrice + price;
    const newTotalItems = this.state.totalItems +1;
    this.setState({ totalPrice:newPrice, totalItems : newTotalItems});
  };
  render() {

    const {widgets, searchWidget} = this.state;
    const filteredWidget = widgets.filter(widget => widget.title.toLowerCase().includes(searchWidget.toLowerCase()))
    
    let widgetData = [];
    if (this.state.widget != null || filteredWidget.length !== 0) {
      widgetData =
      (<Main widgetList={filteredWidget}
              widget = {this.state.onLoadWidgets ? this.state.widget : this.state.filterWidget}
              purchaseHandler = {this.purchaseHandler}
              widgetClicked = {this.onWidgetClickHandler}
              searchTitle = {this.handleOnInputChange}
              totalItems = {this.state.totalItems}
              totalPrice = {this.state.totalPrice} >
      </Main>)
      }else{
        widgetData = (<div className={style.noContent}>no Widgets to Display</div>);
      } 
    return (
     <Aux>
        <Header></Header>
        {widgetData}
      </Aux>
     
    );
  }
}

export default WidgetBuilder;
