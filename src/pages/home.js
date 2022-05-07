import React, { useState, useEffect } from 'react'
import ListBook from '../components/list_books.component'
import bookApi from '../api/book.api';
import { Container, Pagination, Grid, TextField } from '@mui/material';

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
    },
    search: {
        marginBottom: theme.spacing(3),
        maxWidth: 300
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
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    const getData = async () => {
        let searchOb = {}
        if (page) searchOb.page = page
        if (search) searchOb.search = search
        if (category) searchOb.category = category
        const searchParams = new URLSearchParams(searchOb)
        const bookData = await bookApi.getBooks(searchParams.toString())
        const { books, count } = bookData
        setBooks(books)
        setNumbersOfPage(count)
    }

    const getCategoriesData = async () => {
        const categoriessData = await categoryApi.getCategories()
        setCategories(categoriessData)
    }
    const searchBook = (e) => {
        const searchString = e.target.value;
        if (e.keyCode === 13 && searchString !== '') {
            setCategory(null)
            setSearch(searchString);
        }
    }

    useEffect(() => {
        getData()
    }, [page, category, search])

    useEffect(() => {
        getCategoriesData()
    }, [])
    return (
        <Grid container pl={10} pr={15} mt={20}>

            <Grid item sm={4} pl={10}>
                <Categories categories={categories} setSearch={setSearch} setCategory={setCategory} setPage={setPage} />
            </Grid>


            <Grid item sm={8}>

                <Grid item sm={5} mb={5}>
                    <TextField onKeyUp={searchBook} fullWidth id="outlined-basic" label="Search by book name" variant="outlined" />
                </Grid>

                <ListBook books={books} />
                <Container className={classes.pagination}>
                    <Pagination onChange={toPage} size="large" count={numbersOfPage} color="primary" />
                </Container>
            </Grid>
        </Grid>

    );
}