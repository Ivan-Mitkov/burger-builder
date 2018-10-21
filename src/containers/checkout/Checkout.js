import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSumary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  //In App Route is used in two container BurgerBuilder and this one So here we also has access to history
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContiueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    // console.log(this.props)
    // console.log(this.state.ingredients);
    //initialy when taking ings from DB there null, so there is error while trying to load
    //in order to solve this problem
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSumary
            ingredients={this.props.ings}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContiue={this.checkoutContiueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return <div>{summary}</div>;
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);
