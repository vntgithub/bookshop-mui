import React, { useState, useEffect } from 'react'
import ListBook from '../components/list_books.component'
import bookApi from '../api/book.api'

import { Container, Pagination } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bookContainer: {
        padding: theme.spacing(2)
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: theme.spacing(3)
    }

}));
export default function Home() {
    const classes = useStyles();
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(0)
    const toPage = (event, value) => {
        setPage(value)
    }

    useEffect(() => {
        bookApi.getBooks(page, setBooks)
    }, [page])
    return (
        <Container maxWidth="xl">
            <ListBook books={books} />
            <Container className={classes.pagination}>
                <Pagination onChange={toPage} size="large" count={10} color="primary" />
            </Container>
        </Container>
    );
}