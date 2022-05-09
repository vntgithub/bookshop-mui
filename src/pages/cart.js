import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { plusCountOfItemInCart, minusCountOfItemInCart, removeItemInCart } from '../slices/cart.slice';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import AppBar from '../components/app_bar.component'

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    countCell: {
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    marginTop: {
        marginTop: theme.spacing(20)
    },
    totalAmout: {
        color: "#df995b",
        fontWeight: "bold",
        fontSize: 24,
        fontFamily: "monospace"
    },
    tiltleCartPage: {
        color: "#6b4075",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "monospace"
    },
    hideButton: {
        display: "none"
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



const CartPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const user = useSelector(state => state.user.data)
    const userCart = useSelector(state => state.cart.data)
    let totalAmount = userCart.reduce((v1, v2) => v1 + v2.count * v2.book.price, 0)
    totalAmount = Math.round(totalAmount * 100) / 100

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const clickButton = (index, type) => {
        return () => {
            if (type === 'plus') dispatch(plusCountOfItemInCart(index))
            if (type === 'minus') dispatch(minusCountOfItemInCart(index))
            if (type === 'remove') dispatch(removeItemInCart(index))
        }
    }

    const toCreatInvoicePage = () => {
        if (!user.name) {
            setOpen(true)

        } else {
            navigate("/create-invoice")
        }
    }

    return (
        <Container className={classes.marginTop}>
            <AppBar />
            <div className={classes.hideButton}>
                <Button onClick={handleOpen}>Open modal</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Need account to buy
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Please create your account to buy this books.
                        </Typography>
                        <Link href="/sign-up">Create new account</Link>
                    </Box>
                </Modal>
            </div>
            <Grid className={classes.tiltleCartPage} mb={3} container justifyContent="center" textAlign="center">
                <Grid item sm={3}>Your cart</Grid>
            </Grid>
            <TableContainer className={classes.center} component={Paper}>
                <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Count</TableCell>
                            <TableCell align="center">Delete item</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userCart.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">
                                    <img src={row.book.urlimg} />
                                </TableCell>
                                <TableCell align="center">
                                    {row.book.name}
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.countCell}>
                                        <IconButton onClick={clickButton(index, "minus")}>
                                            <RemoveCircleIcon />
                                        </IconButton>
                                        <div>{row.count}</div>
                                        <IconButton onClick={clickButton(index, "plus")}>
                                            <AddCircleIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={clickButton(index, "remove")}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow >
                            <TableCell colSpan={4}>
                                <span className={classes.totalAmout}>Total amout: {totalAmount} $</span>
                            </TableCell>
                            <TableCell >
                                <Button onClick={toCreatInvoicePage} variant="outlined">Buy</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    )
}

export default CartPage