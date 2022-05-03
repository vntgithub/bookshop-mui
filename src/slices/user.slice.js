import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/user.api';


export const login = createAsyncThunk(
    'user/login',
    async (data) => {
        const resData = await userApi.login(data);
        return resData;
    }
);
export const loginByToken = createAsyncThunk(
    'user/loginbytoken',
    async (accessToken) => {
        const resData = await userApi.loginByToken(accessToken)
        return resData;
    }
)



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {},
        loading: false,
        err: ''
    },
    reducers: {},
    extraReducers: {
        [loginByToken.pending]: (state) => {
            state.loading = true;
        },
        [loginByToken.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.err;
        },
        [loginByToken.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload.user;
        },
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.err;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload.user;
        }
    }
});
export default userSlice.reducer;