import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InvoiceApi from '../api/invoice.api'
import swal from 'sweetalert';
import invoiceApi from '../api/invoice.api';
const useStyles = makeStyles((theme) => ({
    marginTop: {
        marginTop: theme.spacing(20),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

}));




const InvoiceTable = (props) => {
    const classes = useStyles()
    const { invoices, setInvoices } = props

    const forwardState = (invoice, index) => () => {
        const newState = forward(invoice.state)
        invoiceApi.update({ state: newState }, invoice._id)

        const newInvoices = [...invoices]
        newInvoices[index].state = newState
        setInvoices(newInvoices)

        swal("Forward state", "Change state successfully", "success")
    }

    const backState = (invoice, index) => () => {
        const newState = back(invoice.state)
        invoiceApi.update({ state: newState }, invoice._id)

        const newInvoices = [...invoices]
        newInvoices[index].state = newState
        setInvoices(newInvoices)

        swal("Forward state", "Change state successfully", "success")
    }

    const forward = (state) => {
        if (state == "Waiting") return "Delivering"
        if (state == "Delivering") return "Done"
        return "Canvel"
    }

    const back = (state) => {
        if (state == "Delivering") return "Waiting"
        if (state == "Done") return "Delivering"
        return "Done"
    }
    return (
        <TableContainer className={classes.center} component={Paper}>
            <Table sx={{ maxWidth: 1200 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Phone number</TableCell>
                        <TableCell align="center">Cart</TableCell>
                        <TableCell align="center">Total amount</TableCell>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center" colSpan={2}>Change State</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell align="center">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                {row.address}
                            </TableCell>

                            <TableCell align="center">
                                {row.phonenumber}
                            </TableCell>
                            <TableCell align="left">
                                {row.cart.map(item => <div>- {item.book.name}</div>)}
                            </TableCell>
                            <TableCell align="center">
                                {Math.round(row.cart.reduce((v1, v2) => v1 + v2.count * v2.book.price, 0) * 100) / 100} $
                            </TableCell>
                            <TableCell align="center">
                                {row.state}
                            </TableCell>

                            <TableCell align="center" >
                                <IconButton onClick={backState(row, index)}>
                                    <ArrowBackIosIcon />
                                </IconButton>

                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={forwardState(row, index)}>
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default InvoiceTable