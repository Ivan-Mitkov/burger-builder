import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSumary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state={
      ingredients:null,
      totalPrice:0 
    }
   
    //parse searchString in CDM
    // if we are using ingredients:NULL we can't use componentDidMount
    //so we are using componentWillMount
    componentWillMount() {        
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for(let param of query.entries()){
            // console.log(`${[param[0]]}=${+param[1]}`)
            if(param[0]==='price'){
                price=+param[1];
            }else{
                ingredients[param[0]]=+param[1]
            }
           
        }
        // console.log("Ingredients",ingredients);
        this.setState({ingredients:ingredients,totalPrice:price});
        
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
            <Route
            path={this.props.match.path+'/contact-data'}
            // in order to send props we use render metho instead component=
            //for using history prop in contact data passing props in render
            render={(props)=>{return <ContactData
                                 ingredients={this.state.ingredients} 
                                 price={this.state.totalPrice}
                                 {...props}/>}}/>
         </div>
     )
 }
}

export default Checkout;