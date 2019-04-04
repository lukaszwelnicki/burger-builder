import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(action, state);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state);
        case actionTypes.FETCH_ORDER_START:
            return fetchOrderStart(state);
        case actionTypes.FETCH_ORDER_SUCCESS:
            return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDER_FAIL:
            return fetchOrderFail(state);
        default:
            return state;
    }
};

const purchaseInit = state => ({
    ...state,
    purchased: false
});

const purchaseBurgerStart = state => ({
    ...state,
    loading: true
});

const purchaseBurgerSuccess = (action, state) => {
    const newOrder = {
        ...action.orderData,
        purchased: true,
        id: action.orderId
    };
    return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
    };
};

const purchaseBurgerFail = state => ({
    ...state,
    loading: false
});

const fetchOrderStart = state => ({
    ...state,
    loading: true
});

const fetchOrderSuccess = (state, action) => ({
    ...state,
    orders: action.orders,
    loading: false
});

const fetchOrderFail = state => ({
    ...state,
    loading: false
});

export default reducer;
