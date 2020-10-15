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
    filterList:[],
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
    
    const query = event.target.value;
    let newWidgetList = [];
    if(query!=="")
    {
      newWidgetList = this.state.widgets.filter((item) => {
      console.log(item);
      let lcKey = item.title.toLowerCase();
      let filter = query.toLowerCase();
      return lcKey.includes(filter);
    });
  
  }else{
        newWidgetList = this.state.widgets;
    }
      this.setState({ filterList : newWidgetList,onLoadWidgets:false, filterWidget : newWidgetList[0]} );
    
  };

  purchaseHandler = (price) => {
    console.log(price);
    const newPrice = this.state.totalPrice + price;
    const newTotalItems = this.state.totalItems +1;
    this.setState({ totalPrice:newPrice, totalItems : newTotalItems});
  };
  render() {
    
    let widgetData = [];
    if (this.state.widget != null || this.state.filterList.length !== 0) {
      widgetData =
      (<Main widgetList={this.state.onLoadWidgets ? this.state.widgets:this.state.filterList}
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
