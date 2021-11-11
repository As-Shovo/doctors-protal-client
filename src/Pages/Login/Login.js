import { Container, Grid, TextField, Typography, Button, AlertTitle, Alert } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import login from '../../images/login.png';
import { useHistory, useLocation } from 'react-router';


const Login = () => {


    const { user, emailPasswordLogingUser, singInWithGoogle, error } = useAuth();

    const [loginData, setLoginData] = useState({});

    const location = useLocation();
    const history = useHistory();

    const handleOnchange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }

    const handleLoginSubmit = e => {
        e.preventDefault()
        emailPasswordLogingUser(loginData.email, loginData.password, location, history);
        console.log(loginData.email, loginData.password);

        // e.preventDefault();
        console.log(loginData);
    }

    const handleGoogleSignin = () =>{
        singInWithGoogle(location, history);
    }


    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{ mt: 8 }} item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom> Login </Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" type="email" name="email" onChange={handleOnchange} label="Your E-mail" variant="standard" />
                        <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" type="password" name="password" onChange={handleOnchange} label="Your Password" variant="standard" />
                        <NavLink style={{ textDecoration: "none" }} to='/register'><Button variant='text'>New User? please Register</Button></NavLink>
                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant='contained'>Login</Button>
                    </form>


                    {user?.email && <Alert severity="success">
                        <AlertTitle>successfully Created</AlertTitle>
                        Welcome — <strong>Stay Conntected</strong>
                    </Alert>}
                    {
                        error && <Alert severity="error">{error}</Alert>
                    }
                    <p>------------------------------------------------</p>
                    <Button variant='contained' onClick={handleGoogleSignin} >Google Singin</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: "100%" }} src={login} alt='...' />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;