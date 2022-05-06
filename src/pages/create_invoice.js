import React, { useEffect } from 'react'
import { Button, Container, Grid, TextField } from "@mui/material"
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import invoiceApi from '../api/invoice.api';
import { deleteCart } from '../slices/cart.slice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const CreateInvoicePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const userCart = useSelector(state => state.cart.data)
    const user = useSelector(state => state.user.data)
    const classes = useStyles();


    const handleOpen = () => setOpen(true);

    useEffect(() => {
        document.getElementById("name").value = user.name
        document.getElementById("phonenumber").value = user.phonenumber
        document.getElementById("address").value = user.address
    }, [])

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
            setOpen(true)
            setTimeout(() => {
                navigate('/my-invoices')
            }, 2000)
        }
    }
    return (
        <Container className={classes.containerInvoice}>
            <div className={classes.hideButton}>
                <Button onClick={handleOpen}>Open modal</Button>
                <Modal
                    open={open}

                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Invoice createed
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Create invoice sussecfuly.
                        </Typography>
                        <Link href="/my-invoices">Detail invoices</Link>
                    </Box>
                </Modal>
            </div>
            <h1 className={classes.titleCreateInvoice}>Your information for the invoice</h1>
            <Grid m={3}>
                <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    variant="outlined" />
            </Grid>
            <Grid m={3}>
                <TextField
                    required
                    fullWidth
                    id="phonenumber"
                    label="Phone numbers"
                    variant="outlined" />
            </Grid>
            <Grid m={3}>
                <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    variant="outlined" />
            </Grid>
            <Grid m={3}>
                <Button onClick={buy} variant="contained">Buy</Button>
            </Grid>
        </Container>
    )
}

export default CreateInvoicePage