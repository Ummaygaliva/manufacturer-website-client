import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Loading from '../../Shared/Loading/Loading';
const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const { _id, price, email, name } = order;



    useEffect(() => {
        fetch('https://elite-toolboxes.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })
    }, [price])
    // if (processing) {
    //     return <Loading />
    // }
    const handleSubmit = async (event) => {

        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        setCardError(error?.message || '')
        setSuccess('');
        setProcessing(true)


        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError.message);
            setProcessing(false)

        }
        else {
            setCardError('')
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent.id)
            setSuccess('Your payment is completed.')
            const payment = {
                order: _id,
                transactionId: paymentIntent.id,

            }
            fetch(`https://elite-toolboxes.herokuapp.com/order/${_id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(payment)
                }
            ).then(res => res.json())
                .then(data => {
                    setProcessing(false)
                    console.log(payment)
                })
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='bg-indigo-500 text-white hover:text-indigo-500 hover:bg-white border hover:border-indigo-500  mt-2 p-2 rounded' type="submit" disabled={!stripe || !clientSecret || !stripe.confirmCardPayment}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-600 my-2'>{cardError}</p>
            }
            {
                success && <div>
                    <p className='text-green-600 my-2'>{success}</p>
                    <p className='text-orange-600 my-2'>Your payment transaction id: {transactionId}</p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;