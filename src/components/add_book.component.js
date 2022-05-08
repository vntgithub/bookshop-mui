import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import swal from 'sweetalert';
import bookApi from '../api/book.api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Input = styled('input')({
    display: 'none',
});

export default function AddBook(props) {
    const { open, handleClose, categories, books, setBooks } = props

    const [category, setCategory] = React.useState('');
    const [img, setImg] = React.useState('#')
    const [file, setFile] = useState(null)

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const getImage = (event) => {
        if (event.target.files.length) {
            const file = event.target.files[0];
            const reader = new FileReader();
            const url = reader.readAsDataURL(file)
            reader.onloadend = function (e) {
                setImg(reader.result)
            }.bind(this);

            setFile(file);
        }
    }

    const createBook = async () => {
        const name = document.getElementById('name').value
        const author = document.getElementById('author').value
        const price = document.getElementById('price').value

        if (name.length * author.length * price.length !== 0) {
            const imageData = new FormData();
            imageData.append('file', file);
            imageData.append('upload_preset', 'booksimage');
            imageData.append('clound_name', 'vntrieu');
            const response = await axios.post("https://api.cloudinary.com/v1_1/vntrieu/image/upload/", imageData)

            const newBook = await bookApi.create({ name, author, price, category, urlimg: response.data.secure_url })
            setBooks([...books, newBook])
            swal("Add book", "Create new book successfully!", "success")
            handleClose()
        } else {
            swal("Add book", "Data invalid!", "error")
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <div>
                    <Box sx={style}>
                        <Typography textAlign='center' id="modal-modal-title" variant="h6" component="h2">
                            Add book
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={10}>
                                <TextField id="name" label="Book name" variant="outlined" />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField id="author" label="Author" variant="outlined" />
                            </Grid>

                            <Grid item xs={10}>
                                <TextField id="price" type='number' label="Price" variant="outlined" />
                            </Grid>
                            <Grid item xs={10}>
                                <Box sx={{ minWidth: 130 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            {categories.map(item => <MenuItem value={item.name}>{item.name}</MenuItem>)}

                                        </Select>
                                    </FormControl>

                                </Box>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <label htmlFor="icon-button-file">
                                        <Input onChange={getImage} accept="image/*" id="icon-button-file" type="file" />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Stack>
                                {img !== "#" && <img width={120} height={180} src={img} />}
                            </Grid>

                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item>
                                <Button onClick={createBook} variant="contained">Create</Button>
                            </Grid>
                        </Grid>



                    </Box>
                </div>
            </Modal>
        </div >
    );
}
