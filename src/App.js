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
import { useDispatch } from 'react-redux';
import { createCart } from './slices/cart.slice';
import { useEffect } from "react";



function App() {
    const dispatch = useDispatch()
    const getCartData = () => {
        const cartInLocalStorage = localStorage.getItem('cart')
        if (cartInLocalStorage) {
            const arrayItems = JSON.parse(cartInLocalStorage);
            dispatch(createCart(arrayItems))
        }
    }

    useEffect(() => {
        getCartData()
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/" element={
                    <div>
                        <AppBar />
                        <Home />
                    </div>
                } />
                <Route path="/cart" element={<CartPage />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;