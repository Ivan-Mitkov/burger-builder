import React, { Component } from "react";
import { Route } from "react-router-dom";
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
    return (
      <div>
        {/* where do i get my ingredients */}
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
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);
