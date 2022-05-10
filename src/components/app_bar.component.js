import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import '../style.css'
import userApi from '../api/user.api';



export default function PrimarySearchAppBar() {
    const user = useSelector(state => state.user.data)

    const userImg = user.img || "#"
    const navigate = useNavigate()
    const userCart = useSelector(state => state.cart.data)
    const numberItemInUserCart = userCart.reduce((v1, v2) => v1 + v2.count, 0)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();

    };

    const toMyInvoicesPage = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        navigate("/my-invoices")
    };

    const logout = () => {
        const refreshToken = localStorage.getItem('refreshToken')
        userApi.logout(refreshToken)
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('adminRefreshToken')
        localStorage.removeItem('adminAccessToken')
        navigate("/sign-in")
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const toCartPage = () => navigate('/cart')

    const toHome = () => navigate("/")

    const toSignIn = () => navigate("/sign-in")

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem >Profile</MenuItem>
            <MenuItem onClick={toMyInvoicesPage}>My invoices</MenuItem>
            <MenuItem onClick={logout}>Log out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem onClick={toCartPage}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={numberItemInUserCart} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {userImg === "#" && <AccountCircle />}
                    {userImg !== "#" && <Avatar alt="Remy Sharp" src={userImg} />}
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className='topMenu'>
                <Toolbar>
                    <div onClick={toHome} className="logo">
                        <img src="https://cdn-icons-png.flaticon.com/128/3532/3532323.png" />

                        <div className="logoTitle">BOOK SHOP</div>
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        <IconButton
                            onClick={toCartPage}
                            size="large"
                            aria-label="show number of item in user's cart"
                            color="inherit"
                        >
                            <Badge badgeContent={numberItemInUserCart} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {userImg !== "#" &&
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar alt="Remy Sharp" src={userImg} />
                            </IconButton>}
                        {userImg === "#" && <Button onClick={toSignIn} className="menu-link">Sign in </Button>}

                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
