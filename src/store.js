import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cartReducer from './slices/cart.slice'


const reducer = combineReducers({
    cart: cartReducer
});
export default configureStore({
    reducer
})