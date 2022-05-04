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
            const index = state.data.findIndex(item => item.book._id === book._id)
            if (index === -1) {
                state.data.push({ book: book, count: 1 })
                localStorage.setItem("cart", JSON.stringify(state.data))
            } else {
                state.data[index].count += 1
                localStorage.setItem("cart", JSON.stringify(state.data))
            }
        },
        removeItemInCart(state, action) {
            const index = action.payload
            state.data.splice(index, 1)
            localStorage.setItem("cart", JSON.stringify(state.data))
        },
        minusCountOfItemInCart(state, action) {
            const index = action.payload
            if (state.data[index].count === 1) {
                state.data.splice(index, 1)
                localStorage.setItem("cart", JSON.stringify(state.data))
            } else {
                state.data[index].count -= 1
                localStorage.setItem("cart", JSON.stringify(state.data))
            }

        },
        plusCountOfItemInCart(state, action) {
            const index = action.payload
            state.data[index].count += 1
            localStorage.setItem("cart", JSON.stringify(state.data))
        },
        deleteCart(state) {
            state.data = []
        }

    }
});
const { actions, reducer } = cartSlice
export const { addItemToCart, createCart, minusCountOfItemInCart, plusCountOfItemInCart, removeItemInCart, deleteCart } = actions
export default reducer;