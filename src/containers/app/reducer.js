import {fromJS , Map} from 'immutable';

import {
    AUTHENTICATE,
    AUTHENTICATE_SUCCESS,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    REQUEST_FAILED,
    FETCH_USERS, 
    FETCH_USERS_SUCCESS, 
    FETCH_USERS_ACTIONS, 
    FETCH_USERS_ACTIONS_SUCCESS,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    ADD_TO_CART,
    ADD_TO_CART_SUCCESS,
    REMOVE_FROM_CART
} from "./constants";

const initialState = fromJS({
    loading: false,
    error: false,
    errorInfo: '',
    currentUser: '',
    userToken: localStorage.getItem('userToken'),
    userId: localStorage.getItem('userId'),
    users: [],
    cartProducts: [],
    products: [],
});

function appReducer(state = initialState, action) {
    switch (action.type) {

        case FETCH_USER:
            return state.set('loading', true).set('error', false);
        case FETCH_USER_SUCCESS:
            return state.set('currentUser', action.user).set('error', false);

        case FETCH_USERS:
            return state.set('loading', true).set('error', false);
        case FETCH_USERS_SUCCESS:
            return state.set('users', action.users).set('error', false);

        case AUTHENTICATE:
            return state.set('loading', true).set('error', false);
        case AUTHENTICATE_SUCCESS:
            return state.set('userId', action.userId).set('userToken', action.token).set('loading', false).set('currentUser', action.user);

        case FETCH_USERS_ACTIONS:
            return state.set('loading', true).set('error', false);
        case FETCH_USERS_ACTIONS_SUCCESS:
            return state.set('userActions', action.userActions).set('loading', false);

        case ADD_TO_CART:
            let newCartProducts = state.get('cartProducts').toJS();
            if(newCartProducts.find(inCart => inCart.id === action.product.id)) {
                newCartProducts.find(inCart => inCart.id === action.product.id).quantity += 1;
            }
            else {
                newCartProducts.push({
                    id: action.product.id,
                    quantity: 1,
                    name: action.product.name,
                    sellPrice: action.product.sellPrice,
                    images: action.product.images,
                });
            }
            localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
            return state.set('cartProducts', fromJS(newCartProducts));
        case ADD_TO_CART_SUCCESS:
            return state.set('loading', false);

        case REMOVE_FROM_CART: 
            let removeCartProducts = state.get('cartProducts').toJS();
            const removeProduct = removeCartProducts.find(inCart => inCart.id === action.productId)
            if(!!removeProduct) {
                if(removeProduct.quantity <= 1) removeCartProducts = removeCartProducts.filter(product => product.id !== action.productId)
                else removeCartProducts.find(inCart => inCart.id === action.productId).quantity -= 1;
            }
            localStorage.setItem('cartProducts', JSON.stringify(removeCartProducts));
            return state.set('cartProducts', fromJS(removeCartProducts));

        case FETCH_PRODUCTS:
            return state.set('loading', true).set('error', false);
        case FETCH_PRODUCTS_SUCCESS:
            return state.set('products', action.products.data)

        case REQUEST_FAILED:
            return state.set('error', true).set('errorInfo', action.error).set('loading', false)
        default:return state;
    }
}

export default appReducer;