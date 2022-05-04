import React from 'react'
import { Button, Container, Grid, TextField } from "@mui/material"
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import invoiceApi from '../api/invoice.api';
import { deleteCart } from '../slices/cart.slice';

const useStyles = makeStyles((theme) => ({
    containerInvoice: {
        display: 'block',
        marginTop: theme.spacing(20)
    },
    titleCreateInvoice: {
        textAlign: 'center',
        fontFamily: ''
    }

}));



const CreateInvoicePage = () => {
    const dispatch = useDispatch()
    const userCart = useSelector(state => state.cart.data)
    const user = useSelector(state => state.user.data)
    const classes = useStyles();


    const buy = () => {
        const name = document.getElementById('name').value
        const phonenumber = document.getElementById('phonenumber').value
        const address = document.getElementById('address').value
        let totalAmount = userCart.reduce((v1, v2) => v1 + v2.count * v2.book.price, 0)
        //check data
        if (name.length * phonenumber.length * address.length !== 0) {
            //call api
            invoiceApi.create(
                {
                    userId: user._id,
                    name,
                    phonenumber,
                    address,
                    totalAmount: totalAmount,
                    cart: userCart,
                    date: new Date()
                }
            )
            localStorage.setItem('cart', [])
            dispatch(deleteCart())
        }
    }
    return (
        <Container className={classes.containerInvoice}>
            <h1 className={classes.titleCreateInvoice}>Your information for the invoice</h1>
            <Grid xs={6} sm={3} m={3}>
                <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    variant="outlined" />
            </Grid>
            <Grid xs={3} sm={3} m={3}>
                <TextField
                    required
                    fullWidth
                    id="phonenumber"
                    label="Phone numbers"
                    variant="outlined" />
            </Grid>
            <Grid xs={3} sm={3} m={3}>
                <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    variant="outlined" />
            </Grid>
            <Grid xs={3} sm={3} m={3}>
                <Button onClick={buy} variant="contained">Buy</Button>
            </Grid>
        </Container>
    )
}

export default CreateInvoicePage