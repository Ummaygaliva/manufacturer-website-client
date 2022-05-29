import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import auth from '../../firebase.init';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        if (user) {
            fetch(`https://elite-toolboxes.herokuapp.com/order?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/')

                    }
                    return res.json()
                })
                .then(data => {
                    setOrders(data)
                });
        }
    }, [navigate, user])


    return (
        <div style={{ fontFamily: 'Poppins, sans-serif' }}>
            <h2 className='text-center text-2xl font-semibold mb-2'>My orders: {orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table lg:w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Tool</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Phone</th>
                            <th>status</th>
                            <th>Transaction id</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => <tr key={order?._id}>
                            <td>{index + 1}</td>
                            <td>{order?.date}</td>
                            <td>{order?.tool_name}</td>
                            <td>{order?.quantity}</td>
                            <td>$ {parseInt(order?.price * order?.quantity)}</td>
                            <td>***{order?.phone.slice(6, 11)}</td>
                            <th>{order?.status}</th>
                            <td>{order?.transactionId}</td>
                            <td>{!order?.paid ? <Link to={`/dashboard/payment/${order?._id}`}>
                                <button className='bg-indigo-500 text-white hover:text-indigo-500 hover:bg-white border hover:border-indigo-500 p-2 rounded'>Pay</button>
                            </Link> :
                                <button className='bg-green-500 cursor-not-allowed p-2 rounded text-white'>Paid</button>
                            }</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;