import React, { Component } from "react";
import Aux from "../../hoc/Hoc";
import axios from "../../axios-order";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI//Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseable: false,
      makeDeal: false,
      loading: false,
      error: false
    };
  }
  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get("https://react-my-burger-abb69.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     // console.log('response',response);
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(err => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState(ingr) {
    const sum = Object.keys(ingr)
      .map(igKey => {
        return ingr[igKey];
      })
      .reduce((val1, val2) => val1 + val2);
    return sum > 0;
  }
  makeDealHandler = () => {
    this.setState({ makeDeal: true });
    // console.log('Deal: ', this.state.makeDeal);
  };
  purchaseCancelHandler = () => {
    this.setState({ makeDeal: false });
  };
  purchaseContinuelHandler = () => {  
    this.props.history.push('/checkout');
   
  };
  render() {
    const disabledInfo = {
      //   ...this.state.ingredients
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      //return true for quantity <=0
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    //if initialize state from DB we can't render
    //SO
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    // if (this.state.ingredients) {
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            // ingredientAdded={this.addIngredientHandler}
            // ingredientRemoved={this.removeIngredientHandler}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.p}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            deal={this.makeDealHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinuelHandler}
          price={this.props.p}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.makeDeal}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    p: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //ingredientName the name in payload from reducer
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
