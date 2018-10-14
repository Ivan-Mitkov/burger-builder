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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value:'fastest',displayValue: 'Fastest' },
                        { value:'cheapest',displayValue: 'Cheapest' },
                    ]
                },
                value: ''
            },
        },
        loading: false
    }
    orderHandler = (e) => {
        //because we are in form the page is reloaded so we use preventDefault
        e.preventDefault();
        console.log(this.props)
        this.setState({ loading: true });
        //for firebase need to add .json
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

        }
        console.log('Order: ', order);
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            }).catch(err => {
                this.setState({ loading: false });
                console.log(err);
            });
    }
    render() {
        const elementsArray = [];
        for (let key in this.state.orderForm) {
            elementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (<form>
            {elementsArray.map((elem) => (
                <Input
                    key={elem.id}
                    elementType={elem.config.elementType}
                    elementConfig={elem.config.elementConfig}
                    value={elem.config.value} />
            ))}
            <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
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