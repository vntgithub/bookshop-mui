import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import AppBar from "./components/app_bar.component";
import CartPage from "./pages/cart";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import MyInvoices from "./pages/my-invoices"
import CreateInvoice from "./pages/create_invoice"
import { useDispatch } from 'react-redux';
import { createCart } from './slices/cart.slice';
import { useEffect } from "react";
import { loginByToken } from "./slices/user.slice";
import userApi from "./api/user.api";
import AdminSignIn from "./pages/admin_sign_in";
import { adminLoginByToken } from "./slices/admin.slice";
import BooksManagerPage from "./pages/books_maneger";

function App() {
    const currentPath = window.location.pathname
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
        const adminAccessToken = localStorage.getItem('adminAccessToken')
        if (accessToken) {            try {
                dispatch(loginByToken(accessToken))
            } catch (error) {
                const refreshToken = localStorage.getItem('refreshToken')
                const newAccessToken = await userApi.getNewAccessToken(refreshToken)

                localStorage.setItem('accessToken', newAccessToken)
                dispatch(loginByToken(newAccessToken))
            }

        }
        if (adminAccessToken) {
            try {
                dispatch(adminLoginByToken(adminAccessToken))
            } catch (error) {
                const refreshToken = localStorage.getItem('adminRefreshToken')
                const newAccessToken = await userApi.getNewAccessToken(refreshToken)

                localStorage.setItem('adminAccessToken', newAccessToken)
                dispatch(adminLoginByToken(newAccessToken))
            }

        }
    }

    const checkPath = () => {
        return (currentPath !== "/sign-in"
            && currentPath !== "/sign-up"
            && currentPath !== "/admin-sign-in"
        )
    }

    useEffect(() => {
        signInByToken()
        getCartData()
    }, [])
    return (
        <BrowserRouter>
            {checkPath() && <AppBar />}
            <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/create-invoice" element={<CreateInvoice />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/" element={<Home />} />
                <Route path="/my-invoices" element={<MyInvoices />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin-sign-in" element={<AdminSignIn />} />
                <Route path="/books-manager" element={<BooksManagerPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;