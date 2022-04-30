import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cartReducer from './slices/cart.slice'
import userReducer from './slices/user.slice'


const reducer = combineReducers({
    cart: cartReducer,
    user: userReducer
});
export default configureStore({
    reducer
})