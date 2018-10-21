import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  // state={
  //     orders:[],
  //     loading:true
  // }
  componentDidMount() {
    // axios.get('/orders.json')
    // .then(res=>{
    //     console.log("Loading orders:",res.data);
    //     const fetchedData=[];
    //     for(let key in res.data){
    //         if(key!=='ingredients'){
    //             fetchedData.push({
    //                 ...res.data[key],
    //                 id:key
    //             })
    //         }

    //     }
    //     console.log('fetched data:',fetchedData);
    //     this.setState({loading:false, orders:fetchedData})
    // })
    // .catch(err=>{
    //     this.setState({loading:false});
    // })
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
