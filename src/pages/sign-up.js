import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UploadButtons from '../components/uploadbutton.component';
import { makeStyles } from '@material-ui/core/styles';
import userApi from '../api/user.api'
import axios from 'axios';
import { useRadioGroup } from '@mui/material';
import swal from 'sweetalert';
const useStyles = makeStyles((theme) => ({
  uploadbutton: {
    marginTop: theme.spacing(2)
  }

}));
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const classes = useStyles()
  const [avtUrl, setAvtUrl] = useState("#")
  const [file, setFile] = useState(null)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const check = data.get('Username').length *
      data.get('Password').length *
      data.get('ConfirmPassword').length *
      data.get('Address').length *
      data.get('Phone')
    if (check === 0) {
      swal("Sign up!", "Data invalid!", "error");
    } else {
      //upload image
      const imageData = new FormData();
      imageData.append('file', file);
      imageData.append('upload_preset', 'booksimage');
      const response = await axios.post("https://api.cloudinary.com/v1_1/vntrieu/image/upload/", imageData)

      const userdata = await userApi.create({
        username: data.get('Username'),
        password: data.get('Password'),
        confirmPassword: data.get('ConfirmPassword'),
        address: data.get('Address'),
        phonenumber: data.get('Phone'),
        img: response.data.secure_url
      })
      swal("Sign up!", "Sign up successfully!", "success");
    }


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="Username"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  type="password"
                  required
                  fullWidth
                  id="Password"
                  label="Password"
                  name="Password"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  type="password"
                  required
                  fullWidth
                  id="ConfirmPassword"
                  label="Confirm assword"
                  name="ConfirmPassword"
                  autoComplete="confirm-pasword"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="Address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Phone"
                  label="Phone"
                  name="Phone"
                  autoComplete="Phone"
                />
                <Grid
                  className={classes.uploadbutton}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                  <Avatar sx={{ width: 100, height: 100 }} alt="Remy Sharp" src={avtUrl} />
                </Grid>
                <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                  <UploadButtons setFile={setFile} setAvtUrl={setAvtUrl} />
                </Grid>

              </Grid>


            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}