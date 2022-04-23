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



function App() {

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

            </Routes>
        </BrowserRouter>
    )
}

export default App;