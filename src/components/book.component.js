import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../slices/cart.slice';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    bookContainer: {
        padding: theme.spacing(2)
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookImg: {
        display: 'flex',
        minHeight: '175px',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '175px'
    },
    ButtonAddToCart: {
        backgroundColor: "darkslateblue",
        '&:hover': {
            backgroundColor: "#a09fe0"
        }
    },


}));
const Book = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { data } = props

    const addToCart = (book) => () => {
        dispatch(addItemToCart(book))
        swal("Add book to cart successfuly!");
    }

    return (
        <Card className={classes.bookContainer}>
            <CardContent>
                <div className={classes.bookImg}>
                    <img width="60%" height="60%" src={data.urlimg} />
                </div>


                <Typography
                    sx={{ fontSize: 12, textAlign: "center", fontWeight: "bold", color: "#3a5c4d" }}
                    minHeight={60}
                    mt={3}
                    component="div">
                    {data.name}
                </Typography>
                <Typography sx={{ mb: 1.5, textAlign: "center", color: "#e67432" }} color="text.secondary">
                    {data.price} $
                </Typography>
                <Typography sx={{ textAlign: "center" }} variant="body2">
                    {data.author}
                </Typography>
            </CardContent>
            <CardActions className={classes.center}>
                <Button
                    onClick={addToCart(data)}
                    className="buttonAddToCart"
                    variant="contained" size="small">
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    )
}

export default Book;