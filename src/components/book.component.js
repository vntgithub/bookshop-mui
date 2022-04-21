import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bookContainer: {
        padding: theme.spacing(2)
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',

    }

}));
const Book = (props) => {
    const classes = useStyles();
    const { data } = props

    const addToCart = (data) => {
        return function () {
            console.log(data)
        }
    }
    return (
        <Card sx={{ minHeight: 450 }} className={classes.bookContainer}>
            <CardContent>
                <Typography className={classes.center} sx={{ fontSize: 14 }} color="text.secondary" mb={3}>
                    <img src={data.urlimg} />
                </Typography>
                <Typography minHeight={80} component="div">
                    {data.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data.price} $
                </Typography>
                <Typography variant="body2">
                    {data.author}
                </Typography>
            </CardContent>
            <CardActions className={classes.center}>
                <Button onClick={addToCart(data)} variant="contained" size="small">Add to cart</Button>
            </CardActions>
        </Card>
    )
}

export default Book;