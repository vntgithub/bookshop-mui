import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons(props) {
    const {setAvtUrl} = props

    const getAvt = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        const url = reader.readAsDataURL(file)
        reader.onloadend = function (e) {
            setAvtUrl(reader.result)
          }.bind(this);

    }

  return (
    <Stack clas direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input onChange={getAvt} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  );
}