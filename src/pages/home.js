import React, { useState, useEffect } from 'react'
import ListBook from '../components/list_books.component'
import bookApi from '../api/book.api';
import { Container, Pagination, Grid } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import categoryApi from '../api/category.api';
import Categories from '../components/categories.component';


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
    const [numbersOfPage, setNumbersOfPage] = useState(0)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState(null)
    const [category, setCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const toPage = (event, value) => {
        setPage(value)
    }

    useEffect(() => {
        const getData = async () => {
            let searchOb = {}
            if (page) searchOb.page = page
            if (search) searchOb.search = search
            if (category) searchOb.category = category
            const searchParams = new URLSearchParams(searchOb)
            const bookData = await bookApi.getBooks(searchParams.toString())
            const categoriessData = await categoryApi.getCategories()
            const { books, count } = bookData
            setBooks(books)
            setNumbersOfPage(count)
            setCategories(categoriessData)
        }
        getData()
    }, [page, category, search])
    return (
        <Grid container pl={10} pr={10}>
            <Grid item sm={4}>
                <Categories categories={categories} setCategory={setCategory} setPage={setPage} />
            </Grid>
            <Grid item sm={8}>
                <ListBook books={books} />
                <Container className={classes.pagination}>
                    <Pagination onChange={toPage} size="large" count={numbersOfPage} color="primary" />
                </Container>
            </Grid>
        </Grid>

    );
}