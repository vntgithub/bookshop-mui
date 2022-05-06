import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from '../api/admin.api';


export const adminLogin = createAsyncThunk(
    'admin/login',
    async (data) => {
        const resData = await adminApi.login(data);
        return resData;
    }
);
export const adminLoginByToken = createAsyncThunk(
    'admin/loginbytoken',
    async (accessToken) => {
        const resData = await adminApi.loginByToken(accessToken)
        return resData;
    }
)



export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: {},
        loading: false,
        err: ''
    },
    reducers: {},
    extraReducers: {
        [adminLoginByToken.pending]: (state) => {
            state.loading = true;
        },
        [adminLoginByToken.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.err;
        },
        [adminLoginByToken.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload.admin;
        },
        [adminLogin.pending]: (state) => {
            state.loading = true;
        },
        [adminLogin.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.err;
        },
        [adminLogin.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload.admin;
        }
    }
});
export default adminSlice.reducer;