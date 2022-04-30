import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import AppBar from "./components/app_bar.component";
import CartPage from "./pages/cart.page";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import MyInvoices from "./pages/my-invoices.page"
import CreateInvoice from "./pages/create_invoice.page"
import { useDispatch } from 'react-redux';
import { createCart } from './slices/cart.slice';
import { useEffect } from "react";
import { loginByToken } from "./slices/user.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import userApi from "./api/user.api";

function App() {
    const dispatch = useDispatch()
    const getCartData = () => {
        const cartInLocalStorage = localStorage.getItem('cart')
        if (cartInLocalStorage) {
            const arrayItems = JSON.parse(cartInLocalStorage);
            dispatch(createCart(arrayItems))
        }
    }
    const signInByToken = async () => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            try {
                dispatch(loginByToken(accessToken))
            } catch (error) {
                const refreshToken = localStorage.getItem('refreshToken')
                const newAccessToken = await userApi.getNewAccessToken(refreshToken)

                localStorage.setItem('accessToken', newAccessToken)
                dispatch(loginByToken(newAccessToken))
            }

        }
    }

    useEffect(() => {
        signInByToken()
        getCartData()
    }, [])
    return (
        <BrowserRouter>
            <AppBar />
            <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/create-invoice" element={<CreateInvoice />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/" element={<Home />} />
                <Route path="/my-invoices" element={<MyInvoices />} />
                <Route path="/cart" element={<CartPage />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;