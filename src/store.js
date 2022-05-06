import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cartReducer from './slices/cart.slice'
import userReducer from './slices/user.slice'
import adminReducer from './slices/admin.slice'


const reducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    admin: adminReducer
});
export default configureStore({
    reducer
})