import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookApi from '../api/book.api';


export const getBooks = createAsyncThunk(
    'book/get',
    async (searchParams) => {
        const resData = await bookApi.getBooks(searchParams);
        return resData;
    }
);


export const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: [],
        count: 0,
        loading: false,
        err: ''
    },
    reducers: {},
    extraReducers: {
        [getBooks.pending]: (state) => {
            state.loading = true;
        },
        [getBooks.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.err;
        },
        [getBooks.fulfilled]: (state, action) => {
            state.loading = false;
            state.books = action.payload.books;
            state.count = action.payload.count;
        }
    }
});

// const { actions, reducer } = bookSlice
export default bookSlice.reducer;