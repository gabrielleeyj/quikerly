import axios from 'axios'
import date from 'date-and-time'

export const orderCreate = (data) => {
    return (dispatch, getState) => {
        const userData = getState().auth.userData;
        let current = new Date().toISOString();
        let reverse = current.slice(0, 10)
        reverse = 'DO-' + reverse.replaceAll('-', '') + '-'
        current = date.transform(current.slice(0, 10).replaceAll('-', '/'), 'YYYY/MM/DD', 'DD/MM/YYYY')
        const orderData = {
            ...data,
            orderDate: current,
            userEmail: userData.userEmail,
            userAddress: userData.userAddress,
            userContact: userData.userContact,
            userPostalCode: userData.userPostalCode,
            userName: userData.userName,
            deliveryOrderNumber: reverse
        }
        axios.post('http://localhost:3002/api/orders', orderData)
            .then((res) => {
                dispatch({ type: 'ORDER_CREATE_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'ORDER_CREATE_ERROR' })
            })
    }
}

export const getOrders = () => {
    return (dispatch, getState) => {
        const userData = getState().auth.userData
        axios.get('http://localhost:3002/api/orders')
            .then((res) => {
                let list;
                if (userData) {
                    if (userData.userType === 'user') {
                        list = res.data.filter(el => el.userEmail === userData.userEmail)
                    }
                    else {
                        list = res.data
                    }
                }
                dispatch({ type: 'GET_ORDERS_SUCCESS', orders: list })
            })
            .catch((err) => {
                dispatch({ type: 'GET_ORDERS_ERROR', err })
            })
    }
}

export const updateOrder = (order, order_id) => {
    return (dispatch, getState) => {
        let orders = getState().order.orders;
        orders = orders.map((el) => {
            if (el._id === order_id) {
                return {
                    ...el,
                    ...order
                }
            }
            else return el
        })
        axios.put('http://localhost:3002/api/orders/' + order_id, order)
            .then((res) => {
                dispatch({ type: 'UPDATE_ORDER_SUCCESS', orders })
            })
            .catch((err) => {
                dispatch({ type: 'UPDATE_ORDER_ERROR', err })
            })
    }
}

export const deleteOrder = (orderId) => {
    return (dispatch, getState) => {
        axios.delete('http://localhost:3002/api/orders/' + orderId)
            .then((res) => {
                dispatch({ type: 'DELETE_ORDER_SUCCESS' })
            })
            .catch(err => {
                dispatch({ type: 'DELETE_ORDER_ERROR', err })
            })
    }
}

export const cleanOrders = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'CLEAN_ORDERS' })
    }
}