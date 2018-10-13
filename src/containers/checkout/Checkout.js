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
 render(){
     return(
         <div>
             {/* where do i get my ingredients */}
           <CheckoutSumary ingredients={this.state.ingredients}></CheckoutSumary>
         </div>
     )
 }
}

export default Checkout;