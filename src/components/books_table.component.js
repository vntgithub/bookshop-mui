import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import bookApi from '../api/book.api';
import swal from 'sweetalert';
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
const BookTable = (props) => {
    const classes = makeStyles()
    const { books, setBooks, handleOpen, setBookNeedUpdate, setIndexBookNeedUpdate } = props

    const deleteBook = (id, index) => () => {
        bookApi.delete(id)
        const newBooks = [...books]
        newBooks.splice(index, 1)
        setBooks(newBooks)
        swal("Delete book", "Delete book successfully!", "success")
    }

    const openUpdateForm = (book, index) => () => {
        setBookNeedUpdate(book)
        setIndexBookNeedUpdate(index)
        handleOpen()
    }

    return (
        <div>
            <TableContainer className={classes.center} component={Paper}>
                <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell colSpan={2} align="center">Name</TableCell>
                            <TableCell colSpan={2} align="center">Author</TableCell>
                            <TableCell colSpan={2} align="center">Price</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">
                                    <img width="35%" height="35%" src={row.urlimg} />
                                </TableCell>
                                <TableCell colSpan={2} align="center">
                                    {row.name}
                                </TableCell>

                                <TableCell colSpan={2} align="center">
                                    {row.author}
                                </TableCell>
                                <TableCell colSpan={2} align="center">
                                    {row.price}
                                </TableCell>

                                <TableCell align="center">
                                    <IconButton>
                                        <EditIcon onClick={openUpdateForm(row, index)} />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={deleteBook(row._id, index)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default BookTable