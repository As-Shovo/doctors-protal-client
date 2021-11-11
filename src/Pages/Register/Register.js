import { Container, Grid, TextField, Typography, Button, Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import login from '../../images/login.png';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory, useLocation } from 'react-router';

const Register = () => {

    const { user, emailPasswordRegister, isLoading, error } = useAuth()

    const [loginData, setLoginData] = useState({});

    const history = useHistory()
    const location = useLocation();


    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }

    console.log(loginData);
    // console.log(loginData); 
    const handleLoginSubmit = e => {


        console.log(location);

        if (loginData.password !== loginData.password2) {
            alert("Your Password Did't match");
            return
        }
        emailPasswordRegister(loginData.email, loginData.password, loginData.name, history);

        
        e.preventDefault();
    }


    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{ mt: 8 }} item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom> Register </Typography>
                    {
                        !isLoading ? <form onSubmit={handleLoginSubmit}>
                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" required type="text" name="name" onBlur={handleOnBlur} label="Your Name" variant="standard" />
                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" required type="email" name="email" onBlur={handleOnBlur} label="Your " variant="standard" />
                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" required  type="password" name="password" onBlur={handleOnBlur} label="Your Password" variant="standard" />
                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" required type="password" name="password2" onBlur={handleOnBlur} label="Re-type Ypur Password" variant="standard" />
                            <NavLink style={{ textDecoration: "none" }} to='/login'><Button variant='text'>Already Registered? Please Login</Button></NavLink>
                            <Button sx={{ width: '75%', m: 1 }} type="submit" variant='contained'> Register </Button>
                        </form> : <CircularProgress color="secondary" />
                    }

                    {user?.email && <Alert severity="success">
                        <AlertTitle>successfully Created</AlertTitle>
                        Welcome — <strong>Stay Conntected</strong>
                    </Alert>}
                    {
                        error && <Alert severity="error">{error}</Alert>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: "100%" }} src={login} alt='...' />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;