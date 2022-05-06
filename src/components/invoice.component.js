import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import invoiceApi from '../api/invoice.api';
const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    countCell: {
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    marginTop: {
        marginTop: theme.spacing(20),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    waiting: {
        color: "darkgoldenrod"
    }

}));
const Invoice = (props) => {
    const { invoice, setInvoices, invoices, index } = props
    const cart = invoice.cart
    const classes = useStyles();
    let totalAmount = cart.reduce((v1, v2) => v1 + v2.count * v2.book.price, 0)
    totalAmount = Math.round(totalAmount * 100) / 100
    const cancel = async () => {

        const cancelResult = await invoiceApi.cancel(invoice._id)
        console.log(cancelResult)
        let newInvoices = [...invoices]
        newInvoices[index].state = 'Cancel'

        setInvoices(newInvoices)

    }
    const stateOfInvoice = (state) => {
        switch (state) {
            case 'Watting':
                return <TableCell align="center"><span className={classes.waiting}>{state}</span></TableCell>
            case 'Delivering':
                return <TableCell className='delivering' align="center">{state}</TableCell>
            case 'Successfull':
                return <TableCell className='successful' align="center">{state}</TableCell>
            default:
                return <TableCell className='cancel' align="center">{state}</TableCell>
        }
    }

    return (
        <div>
            <TableContainer className={classes.marginTop} component={Paper}>
                <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{invoice._id}</TableCell>
                            <TableCell colSpan={2} align="center">{invoice.date}</TableCell>
                            {stateOfInvoice(invoice.state)}
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <TableContainer className={classes.center} component={Paper}>

                <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell colSpan={2} align="center">Name</TableCell>
                            <TableCell align="center">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((row, index) => (
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
                                <TableCell colSpan={2} align="center">
                                    {row.book.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.count}
                                </TableCell>

                            </TableRow>
                        ))}
                        <TableRow >
                            <TableCell colSpan={4}>
                                <span className={classes.totalAmout}>Total amout: {totalAmount} $</span>
                            </TableCell>
                            {invoice.state === 'Waiting' &&
                                <TableCell >
                                    <Button onClick={cancel} variant="outlined">Cancel</Button>
                                </TableCell>}
                            {invoice.state === 'Successful' || invoice.state === "Cancel" &&
                                <TableCell >
                                    <Button variant="outlined">Buy again</Button>
                                </TableCell>}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default Invoice