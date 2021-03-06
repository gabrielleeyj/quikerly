const initState = {
    orders: null,
    err: null
}

const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ORDER_CREATE_ERROR':
            return {
                ...state,
                err: action.err
            }
        case 'ORDER_CREATE_SUCCESS':
            return {
                ...state,
            }
        case 'GET_ORDERS_SUCCESS':
            return {
                ...state,
                orders: action.orders
            };
        case 'GET_ORDERS_ERROR':
            return {
                ...state,
                err: action.err
            }
        case 'UPDATE_ORDER_SUCCESS':
            return {
                ...state,
                orders: action.orders
            }
        case 'UPDATE_ORDER_ERROR':
            return {
                ...state,
                err: action.err
            }
        case 'DELETE_ORDER_SUCCESS':
            return {
                ...state
            }
        case 'DELETE_ORDER_ERR':
            return {
                ...state,
                err: action.err
            }
        case 'ORDERS_SELECTED':
            return {
                ...state,
                orders: action.orders
            }
        case 'CLEAN_ORDERS':
            return {
                ...state,
                orders: []
            }
        default:
            return state
    }
}

export default orderReducer