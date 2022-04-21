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
export default cartSlice.reducer;