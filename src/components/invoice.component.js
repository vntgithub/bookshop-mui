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
const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(10)
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

}));
const Invoice = (props) => {
    const { cart } = props
    const classes = useStyles();
    let totalAmount = cart.reduce((v1, v2) => v1 + v2.count * v2.book.price, 0)
    totalAmount = Math.round(totalAmount * 100) / 100

    return (
        <TableContainer className={classes.center} component={Paper}>
            <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="center">Image</TableCell>
                        <TableCell align="center">Name</TableCell>
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
                            <TableCell align="center">
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
                        <TableCell >
                            <Button variant="outlined">Buy again</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default Invoice