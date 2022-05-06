import { Container } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import AdminMenu from '../components/admin_menu.component'
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination'
import BookTable from '../components/books_table.component';
import bookApi from '../api/book.api';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@material-ui/core';

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
    }

}));

const BooksManagerPage = () => {
    const classes = useStyles()
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState(null)
    const [numbersOfPage, setNumbersOfPage] = useState(0)
    const getBooks = async () => {
        let searchOb = {}
        if (page) searchOb.page = page
        if (search) searchOb.search = search

        const searchParams = new URLSearchParams(searchOb)
        const bookData = await bookApi.getBooks(searchParams.toString())
        const { books, count } = bookData
        setBooks(books)
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
        getBooks()
    }, [page, search])
    return (
        <div className='marginTop'>
            <Container className={classes.marginTop} mt={5} maxWidth='xl'>
                <Grid container spacing={2} >
                    <Grid item xs={3}>
                        <AdminMenu />
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.addBookButton}>
                            <Grid>
                                Create new book
                                <IconButton>
                                    <AddCircleIcon />
                                </IconButton>
                            </Grid>


                        </div>
                        <BookTable books={books} />
                        <Pagination onChange={toPage} size="large" count={numbersOfPage} color="primary" />
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}

export default BooksManagerPage