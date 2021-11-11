import { Button, TextField, AlertTitle, Alert } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const {token} = useAuth();
    const handleOnBlure = (e) => {
        setEmail(e.target.value);
    }


    const handleAdminSubmit = (e) => {

        const user = { email };
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount) {
                    console.log(result);
                    setSuccess(true);

                }
            })
        e.preventDefault()
    }

    return (
        <div>
            <h2>Make an admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField
                    sx={{ width: "50%" }}
                    label="E-mail"
                    variant="standard"
                    type="email"
                    onBlur={handleOnBlure}
                />

                <Button type="submit" variant="contained"> Make Admin</Button>
            </form>
            {success && <Alert severity="success">
                <AlertTitle>successfully Maked</AlertTitle>
                Welcome — <strong>Admin</strong>
            </Alert>}
        </div>
    );
};

export default MakeAdmin;