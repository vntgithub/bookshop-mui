import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './slices/user';
import cartReducer from './slices/cart'


const reducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});
export default configureStore({
    reducer
})