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

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
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

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersInit());
    axios
      .get("/orders.json")
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
        dispatch(fetchOrdersFailed(err))
        // this.setState({ loading: false });
      });
  };
};
