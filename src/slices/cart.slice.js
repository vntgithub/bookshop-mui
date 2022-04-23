import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: []
    },
    reducers: {
        createCart(state, action) {
            state.data = action.payload
        },
        addItemToCart(state, action) {
            const book = action.payload
            const index = state.data.findIndex(item => item.book._id == book)
            if (index == -1) {
                state.data.push({ book: book, count: 1 })
            } else {
                state.data[index].count += 1
            }
        }
    }
});
const { actions, reducer } = cartSlice
export const { addItemToCart, createCart } = actions
export default reducer;