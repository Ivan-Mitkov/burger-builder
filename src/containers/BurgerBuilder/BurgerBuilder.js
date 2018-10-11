import React, { Component } from 'react';
import Aux from '../../hoc/Hoc';
import axios from '../../axios-order';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI//Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchaseable: false,
            makeDeal: false
        }
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        //updating prices
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        //updating prices
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);


    }
    updatePurchaseState(ingr) {

        const sum = Object.keys(ingr).map((igKey) => {
            return ingr[igKey]
        }).reduce((val1, val2) => val1 + val2);
        // console.log("Sum: ", sum);

        this.setState({ purchaseable: (sum > 0) });
    }
    makeDealHandler = () => {
        this.setState({ makeDeal: true });
        console.log('Deal: ', this.state.makeDeal);
    }
    purchaseCancelHandler = () => {
        this.setState({ makeDeal: false });
    }
    purchaseContinuelHandler = () => {
        // alert('Continue choosing ingredients');
        //for firebase need to add .json
        const order ={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Ivan',
                address:{
                    street:'Pensilvania Avenue 1600',
                    zipcode:'1000'
                },
                email:'boss@us.com'
            },
            deliveryMethod:'fastest'

        }
        axios.post('/orders.json',order)
        .then(response=>{
            console.log(axios.baseURL);
            console.log(response);
        }).catch(err=>console.log(err, axios.BaseUrl));
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            //return true for quantity <=0
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.makeDeal} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                        cancel={this.purchaseCancelHandler}
                        continue={this.purchaseContinuelHandler}
                        price={this.state.totalPrice}>
                        
                    </OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    deal={this.makeDealHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;