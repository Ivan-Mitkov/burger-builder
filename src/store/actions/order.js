import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: data
  };
};
export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  };
};

//async
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};
//token for auth send token from container contact data
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
    //add token for auth
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        console.log("orders response: ", response.data);
        //id is on response data name
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFailed(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT
  };
};
export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders
  };
};
export const fetchOrdersFailed = err => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    payload: err
  };
};

export const fetchOrders = token => {
  return dispatch => {
    dispatch(fetchOrdersInit());
    axios
      //add token for authentication in order auth user to be able to use this ?auth=
      .get("/orders.json?auth=" + token)
      .then(res => {
        console.log("Loading orders:", res.data);
        const fetchedData = [];
        for (let key in res.data) {
          if (key !== "ingredients") {
            fetchedData.push({
              ...res.data[key],
              id: key
            });
          }
        }
        console.log("fetched data:", fetchedData);
        dispatch(fetchOrdersSuccess(fetchedData));
        // this.setState({ loading: false, orders: fetchedData });
      })
      .catch(err => {
        dispatch(fetchOrdersFailed(err));
        // this.setState({ loading: false });
      });
  };
};
