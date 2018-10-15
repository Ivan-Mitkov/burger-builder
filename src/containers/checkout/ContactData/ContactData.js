import React, { Component } from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                validation:{},
                valid:true
            },
        },
        formIsValid: false,
        loading: false
    }
    //IMPORTANT------------------------------
    orderHandler = (e) => {
        //because we are in form the page is reloaded so we use preventDefault
        e.preventDefault();
        // console.log(this.props)
        this.setState({ loading: true });

        //some data from state doesn't need to be stored in DB 
        //!!!!!create model for storing data
        const formData = {}
        for (let formElemIdentifier in this.state.orderForm) {
            formData[formElemIdentifier] = this.state.orderForm[formElemIdentifier].value;
            //creates model to store formData{name:value,street:value ...}
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            //create new property to save
            orderData: formData

        }
        //!!!!!
        //for firebase need to add .json
        // console.log('Order: ', order);
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            }).catch(err => {
                this.setState({ loading: false });
                console.log(err);
            });
    }
    ///--------------------------------------
    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }

        return isValid;
    }
    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        //copy state SHALLOW
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //take the coppied form which is now not refering to the original access inputIdentifier 
        //create a clone to this element 
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
        //and now it's save to update the value 
        updatedFormElement.value = event.target.value;
        //validate value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        //update touch for form validation in this method we now that it was touched
        updatedFormElement.touched = true;
        //now work up save the object wich hold the value
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // console.log(updatedFormElement);

        //check if the form is valid
        let formIsValid = true;
        for (let inputIdentifiers in updatedOrderForm) {
            // console.log(updatedOrderForm[inputIdentifiers])
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid
            // console.log(inputIdentifiers + ':' + updatedOrderForm[inputIdentifiers].valid)
            // console.log('Form is valid',formIsValid)

        }

        //set state is ok to use - not mutating because we copy deep the value - we are changing only the value
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
        //now we can bind disable property on the button with IsValid

    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
    render() {
        const elementsArray = [];
        for (let key in this.state.orderForm) {
            elementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {elementsArray.map((elem) => (
                    <Input
                        key={elem.id}
                        elementType={elem.config.elementType}
                        elementConfig={elem.config.elementConfig}
                        value={elem.config.value}
                        //select doesn't have validataion so we can't use !elem.config.valid it will be always false for select
                        invalid={elem.config.valid === false}
                        touched={elem.config.touched === true}
                        //because we need method identifier we have to use anonymous function instead simple reference
                        changed={(event) => this.inputChangedHandler(event, elem.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid} >Order</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData; 