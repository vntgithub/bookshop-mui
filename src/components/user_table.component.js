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
import userApi from '../api/user.api';
import swal from 'sweetalert';

const UserTable = (props) => {
    const classes = makeStyles()
    const { users, setUsers, handleOpen, setUserNeedUpdate, setIndexUserNeedUpdate } = props

    const deleteUser = (id, index) => () => {
        userApi.delete(id)
        const newUsers = [...users]
        newUsers.splice(index, 1)
        setUsers(newUsers)
        swal("Delete book", "Delete book successfully!", "success")
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
                            <TableCell colSpan={2} align="center">Address</TableCell>
                            <TableCell colSpan={2} align="center">Phone number</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">
                                    <img width="35%" height="35%" src={row.img} />
                                </TableCell>
                                <TableCell colSpan={2} align="center">
                                    {row.name}
                                </TableCell>

                                <TableCell colSpan={2} align="center">
                                    {row.address}
                                </TableCell>
                                <TableCell colSpan={2} align="center">
                                    {row.phonenumber}
                                </TableCell>


                                <TableCell align="center">
                                    <IconButton onClick={deleteUser(row._id, index)}>
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

export default UserTable