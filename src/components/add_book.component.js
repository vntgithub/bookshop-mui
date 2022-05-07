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
    const { open, handleOpen, handleClose, categories } = props

    const [category, setCategory] = React.useState('');
    const [img, setImg] = useState('#')

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const getImage = (e) => {
        console.log(e)
        if (e.target.files.length) {
            const src = URL.createObjectURL(e.target.files[0]);
            console.log(src)
            // setImg(src)
        }
    }

    const createBook = () => {
        const name = document.getElementById('name').value
        const author = document.getElementById('author').value
        const price = document.getElementById('price').value

        console.log({ name, author, price, category })
    }

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
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
                                    <label htmlFor="contained-button-file">
                                        <Input onChange={getImage} accept="image/*" id="contained-button-file" multiple type="file" />

                                    </label>
                                    <label htmlFor="icon-button-file">
                                        <Input accept="image/*" id="icon-button-file" type="file" />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Stack>
                                {img !== "#" && <img src={img} />}
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
