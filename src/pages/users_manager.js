import { Container } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import AdminMenu from '../components/admin_menu.component'
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination'
import UserTable from '../components/user_table.component';
import bookApi from '../api/book.api';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@material-ui/core';
import AddBook from '../components/add_book.component';
import categoryApi from '../api/category.api';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/app_bar.component'
import UpdateBook from '../components/update_book.componet';
import { TextField } from '@mui/material';
import AdminAppBar from '../components/admin_app_bar.component';
import userApi from '../api/user.api';

const useStyles = makeStyles((theme) => ({
    marginTop: {
        marginTop: theme.spacing(20),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBookButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },


    pagination: {
        marginTop: theme.spacing(2)
    }

}));

const UsersManagerPage = () => {

    const navigate = useNavigate()

    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState(null)
    const [numbersOfPage, setNumbersOfPage] = useState(0)
    const [userNeedUpdate, setUserNeedUpdate] = useState({})
    const [indexUserNeedUpdate, setIndexUserNeedUpdate] = useState(-1)
    const [openUpdate, setOpenUpdate] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const getUsers = async () => {
        let searchOb = {}
        if (page) searchOb.page = page

        const searchParams = new URLSearchParams(searchOb)
        const userData = await userApi.getUsers(searchParams)
        const { users, count } = userData
        setUsers(users)
        setNumbersOfPage(count)
    }


    const toPage = (event, value) => {
        setPage(value)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }


    useEffect(() => {
        getUsers()
    }, [page])

    return (
        <div className='marginTop'>
            <AdminAppBar />
            {/* <AddBook
                books={books}
                setBooks={setBooks}
                categories={categories}
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
                handleClose={handleClose} />
            <UpdateBook
                bookNeedUpdate={bookNeedUpdate}
                indexBookNeedUpdate={indexBookNeedUpdate}
                books={books}
                setBooks={setBooks}
                categories={categories}
                open={openUpdate}
                setOpen={setOpenUpdate}
                handleOpen={handleOpenUpdate}
                handleClose={handleCloseUpdate}
            /> */}
            <Container className={classes.marginTop} mt={5} maxWidth='xl'>
                <Grid container spacing={2} >
                    <Grid item xs={3}>
                        <AdminMenu />
                    </Grid>
                    <Grid item xs={6} spacing={2}>
                        <UserTable
                            setUserNeedUpdate={setUserNeedUpdate}
                            setIndexUserNeedUpdate={setIndexUserNeedUpdate}
                            handleOpen={handleOpenUpdate}
                            setUsers={setUsers}
                            users={users} />
                        <Pagination className={classes.pagination} onChange={toPage} size="medium" count={numbersOfPage} color="primary" />
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}

export default UsersManagerPage