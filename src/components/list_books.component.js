import React, { useState } from 'react'
import Book from './book.component'
import Grid from '@mui/material/Grid';

const ListBook = (props) => {
    const { books } = props
    return (
        <Grid container spacing={7}>
            {books.map((element) =>
                <Grid item xs={3}>
                    <Book data={element} />
                </Grid>)}
        </Grid>
    )
}

export default ListBook;