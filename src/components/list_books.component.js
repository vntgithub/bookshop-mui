import React from 'react'
import Book from './book.component'
import Grid from '@mui/material/Grid';

const ListBook = (props) => {
    const { books } = props
    return (
        <Grid container spacing={5}>
            {books.map((element, index) =>
                <Grid key={index} item xs={3}>
                    <Book data={element} />
                </Grid>)}
        </Grid>
    )
}

export default ListBook;