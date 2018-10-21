import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSumary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/actions/index";

class Checkout extends Component {
  //for redirect after order
  componentWillMount() {
    this.props.onInitPurchase();
  }

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
      //when purchased is done
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
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
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

//redicting
const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
