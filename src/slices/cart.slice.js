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
            const index = state.data.findIndex(item => item.book._id === book)
            if (index === -1) {
                state.data.push({ book: book, count: 1 })
            } else {
                state.data[index].count += 1
            }
        },
        removeItemInCart(state, action) {
            const index = action.payload
            state.data.splice(index, 1)
        },
        minusCountOfItemInCart(state, action) {
            const index = action.payload
            if (state.data[index].count === 1)
                state.data.splice(index, 1)
            else
                state.data[index].count -= 1
        },
        plusCountOfItemInCart(state, action) {
            const index = action.payload
            state.data[index].count += 1
        }
    }
});
const { actions, reducer } = cartSlice
export const { addItemToCart, createCart, minusCountOfItemInCart, plusCountOfItemInCart, removeItemInCart } = actions
export default reducer;