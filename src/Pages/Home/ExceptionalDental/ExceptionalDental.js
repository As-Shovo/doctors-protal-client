import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import treatment from '../../../images/treatment.png';

const ExceptionalDental = () => {
    return (
        <Grid container spacing={2} sx={{my:7}}>
            <Grid item xs={12} md={6}>
                <img style={{ width: "70%" }} src={treatment} alt="..." />
            </Grid>
            <Grid item xs={12} md={6} sx={{my:"auto"}} style={{textAlign:"left"}}>
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                    Exceptional Dental Care, on Your Terms
                </Typography>
                <Typography variant="p" sx={{ color: 'gray', marginTop:'10px'}}>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Typography>
                    <br/>
                    <Button variant="contained">Learn more</Button>
            </Grid>
        </Grid>
    );
};

export default ExceptionalDental;