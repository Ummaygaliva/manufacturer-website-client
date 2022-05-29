import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L46WLGn90XX63vtUNVNeolUocNAWu7WBHQ4lOLjoS40zNkoTt939E4PshOVtyRLKX9nhVotqVb6hLAOVWHKx12M00hf0Vj3pw');

const Payment = () => {
    const { id } = useParams();
    const { data: order, isLoading } = useQuery('order', () => fetch(`https://elite-toolboxes.herokuapp.com/order/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
    ).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flex justify-center items-center' style={{ fontFamily: 'Poppins, sans-serif' }} >
            <div>
                <div className="card w-50 max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className='text-xl font-semibold'>Hello, {order?.name}</h1>
                        <h2 className="text-xl">Please pay for {order?.tool_name}</h2>
                        <p>Order date: {order?.date}</p>
                        <p>Payment amount: $ {order?.price}</p>

                    </div>
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm order={order} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;