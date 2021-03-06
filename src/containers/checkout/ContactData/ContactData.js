import React, { Component } from "react";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";
import Button from "../../../components/UI/Button/Button";
import Spinner from "./../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your zipcode"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
   
  };
  //IMPORTANT------------------------------
  orderHandler = e => {
    //because we are in form the page is reloaded so we use preventDefault
    e.preventDefault();
    // console.log(this.props)

    //some data from state doesn't need to be stored in DB
    //!!!!!create model for storing data
    const formData = {};
    for (let formElemIdentifier in this.state.orderForm) {
      formData[formElemIdentifier] = this.state.orderForm[
        formElemIdentifier
      ].value;
      //creates model to store formData{name:value,street:value ...}
    }

    //from REDUX
    const order = {
      ingredients: this.props.ings,
      price: this.props.p,
      //create new property to save
      orderData: formData,
      userId:this.props.userId
    };
    //dispatch onOrderBurger so add token from props for auth
    this.props.onOrderBurger(order,this.props.token)
  };
  ///--------------------------------------
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    //copy state SHALLOW
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    //take the coppied form which is now not refering to the original access inputIdentifier
    //create a clone to this element
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    //and now it's save to update the value
    updatedFormElement.value = event.target.value;
    //validate value
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    //update touch for form validation in this method we now that it was touched
    updatedFormElement.touched = true;
    //now work up save the object wich hold the value
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    // console.log(updatedFormElement);

    //check if the form is valid
    let formIsValid = true;
    for (let inputIdentifiers in updatedOrderForm) {
      // console.log(updatedOrderForm[inputIdentifiers])
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
      // console.log(inputIdentifiers + ':' + updatedOrderForm[inputIdentifiers].valid)
      // console.log('Form is valid',formIsValid)
    }

    //set state is ok to use - not mutating because we copy deep the value - we are changing only the value
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    //now we can bind disable property on the button with IsValid
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  render() {
    //loop through state object
    const elementsArray = [];
    for (let key in this.state.orderForm) {
      elementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {elementsArray.map(elem => (
          <Input
            key={elem.id}
            elementType={elem.config.elementType}
            elementConfig={elem.config.elementConfig}
            value={elem.config.value}
            //select doesn't have validataion so we can't use !elem.config.valid it will be always false for select
            invalid={elem.config.valid === false}
            touched={elem.config.touched === true}
            //because we need method identifier we have to use anonymous function instead simple reference
            changed={event => this.inputChangedHandler(event, elem.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
    //add extra level for combine reducer
  return {
    p: state.burgerBuilder.totalPrice,
    ings: state.burgerBuilder.ingredients,
    loading:state.order.loading,
    token:state.auth.token,
    userId:state.auth.userId
  };
};

//add token here
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
