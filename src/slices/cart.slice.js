import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: []
    },
    reducers: {
        add(state, action) {
            state.push(action.payload)
        }
    }
});
const { actions, reducer } = cartSlice
export const { add } = actions
export default reducer;