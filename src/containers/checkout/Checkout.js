import React, {Component} from 'react';
import CheckoutSumary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state={
      ingredients:{
        salad:1,
        meat:1,
        bacon:1,
        cheese:1
      } 
    }

    //In App Route is used in two container BurgerBuilder and this one So here we also has access to history
    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContiueHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }
 render(){
     return(
         <div>
             {/* where do i get my ingredients */}
           <CheckoutSumary
            ingredients={this.state.ingredients}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContiue={this.checkoutContiueHandler}
            ></CheckoutSumary>
         </div>
     )
 }
}

export default Checkout;