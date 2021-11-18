import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51JwWB6Lp3ycr9BqTg7GzAWFBZNvAs8qW9uKUBQl3xux9gEeXyBE69gZTao0u0KMcWLujV72QfNPVqdFxJuJCUwfL008qmCEIek')

const Payment = () => {
    const { appointmentId } = useParams();

    const [appointment, setAppointment] = useState({});



    useEffect(() => {
        fetch(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => {
                setAppointment(data)
            })
    }, [appointmentId])


    return (
        <div>
            <h2>Please Pay for : {appointment.patientName} for {appointment.erviceName}</h2>
            <h3>Pay: ${appointment.price}</h3>
            {
                appointment.price && <Elements stripe={stripePromise}>
                    <CheckoutForm appointment={appointment}></CheckoutForm>
                </Elements>
            }
        </div>
    );
};

export default Payment;

/*
1. Install Stripe and Stripe-react
2. Set Publishable key
3. Elements
4. Checkout Form
-------------

5. Create Payment method


*/