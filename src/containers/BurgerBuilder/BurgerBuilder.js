import React, { Component } from "react";
import Aux from "../../hoc/Hoc";
import axios from "../../axios-order";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI//Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ingredients: {
      //     salad: 0,
      //     bacon: 0,
      //     cheese: 0,
      //     meat: 0
      // },
      ingredients: null,
      totalPrice: 4,
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
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    //updating prices
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    //updating prices
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  updatePurchaseState(ingr) {
    const sum = Object.keys(ingr)
      .map(igKey => {
        return ingr[igKey];
      })
      .reduce((val1, val2) => val1 + val2);
    // console.log("Sum: ", sum);

    this.setState({ purchaseable: sum > 0 });
  }
  makeDealHandler = () => {
    this.setState({ makeDeal: true });
    // console.log('Deal: ', this.state.makeDeal);
  };
  purchaseCancelHandler = () => {
    this.setState({ makeDeal: false });
  };
  purchaseContinuelHandler = () => {
    // // alert('Continue choosing ingredients');

    //create array for query
    const queryParams = [];
    for (let i in this.state.ingredients) {
      //encode ingredients so that they can be used in URL
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients[i]
        )}`
      );
    }
    //push also total price because it's calculated here
    queryParams.push("price=" + encodeURIComponent(this.state.totalPrice));
    //join the array as string with & sign
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
    //then queryString it will be send to checkout and parsed there
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
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
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            deal={this.makeDealHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinuelHandler}
          price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
