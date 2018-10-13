import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSumary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state={
      ingredients:{
        salad:1,
        meat:1,
        bacon:1,
        cheese:1
      } 
    }
   
    //parse searchString in CDM
    componentDidMount() {        
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query.entries()){
            // console.log(`${[param[0]]}=${+param[1]}`)
            ingredients[param[0]]=+param[1]
        }
        // console.log("Ingredients",ingredients);
        this.setState({ingredients:ingredients});
        
    }
    
    //In App Route is used in two container BurgerBuilder and this one So here we also has access to history
    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContiueHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }
 render(){
    // console.log(this.props)
    // console.log(this.state.ingredients);
     return(
         <div>
             {/* where do i get my ingredients */}
           <CheckoutSumary
            ingredients={this.state.ingredients}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContiue={this.checkoutContiueHandler}
            ></CheckoutSumary>
            <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
         </div>
     )
 }
}

export default Checkout;