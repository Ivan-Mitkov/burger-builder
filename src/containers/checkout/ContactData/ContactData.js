import React, { Component } from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
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
            customer: {
                name: 'Ivan',
                address: {
                    street: 'Pensilvania Avenue 1600',
                    zipcode: '1000'
                },
                email: 'boss@us.com'
            },
            deliveryMethod: 'fastest'

        }
        console.log('Order: ', order);
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false});
                this.props.history.push('/');
            }).catch(err => {
                this.setState({ loading: false });
                console.log(err);
            });
    }
    render() {
        let form = (<form>
            <input type='text' name='name' placeholder='Your Name' />
            <input type='email' name='email' placeholder='Your Email' />
            <input type='text' name='street' placeholder='Your Street' />
            <input type='text' name='postcode' placeholder='Your Postal Code' />
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