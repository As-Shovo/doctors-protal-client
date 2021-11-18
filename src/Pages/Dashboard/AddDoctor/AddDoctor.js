import { Button, Input, TextField } from '@mui/material';
import React, { useState } from 'react';

const AddDoctor = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState('');

    const handleSubmit = e => {

        if (!image) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch('http://localhost:5000/doctors', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if(result.insertedId){
                    console.log('doctor added successfully');
                    setSuccess('Doctor Added SuccessFully');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        e.preventDefault();
    }


    return (
        <div>
            <h3> Add a Doctor </h3>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ width: '50%', }} onChange={e => setName(e.target.value)} label="Name" variant="standard" /> <br />
                <TextField sx={{ width: '50%', }} onChange={e => setEmail(e.target.value)} label="Email" variant="standard" /> <br />
                <Input accept="image/*" type="file" onChange={e => setImage(e.target.files[0])} />
                <br />
                <Button variant="contained" type="submit">
                    Add Doctor
                </Button>
            </form>
            {success && <p style={{color:'green'}}>{success}</p>}
        </div>
    );
};

export default AddDoctor;