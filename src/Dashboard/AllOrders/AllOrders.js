import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DeleteOrderModal from '../../Shared/DeleteOrderModal/DeleteOrderModal';
import Loading from '../../Shared/Loading/Loading';
import ShippedOrderModal from '../../Shared/ShippedOrderModal/ShippedOrderModal';

const AllOrders = () => {
    const [deletingOrder, setDeletingOrder] = useState();
    const [shippingOrder, setShippingOrder] = useState();
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('https://elite-toolboxes.herokuapp.com/orders', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div style={{ fontFamily: 'Poppins,sans-serif' }}>
                <h1 className='text-center text-2xl font-semibold my-4 bg-white'>Manage {orders.length} orders</h1>
                <table className="table w-full bg-white">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Tool</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <tr key={order?._id}>
                                <th>{index + 1}</th>
                                <td>{order?.name}</td>
                                <td>{order?.email}</td>
                                <td>{order?.date}</td>
                                <td>{order?.tool_name}</td>
                                <td>{parseInt(order?.price * order?.quantity)}</td>
                                <td className='flex gap-3'>
                                    <label
                                        onClick={() => setDeletingOrder(order)} htmlFor="delete-confirm-modal" className="fal fa-trash-arrow-up text-red-600 cursor-pointer"></label>

                                    {order?.paid === true && order?.status === 'pending' ?
                                        <label
                                            onClick={() => setShippingOrder(order)} htmlFor="delete-confirm-modal" className="fal fa-truck text-green-600 cursor-pointer pb-1"></label> : <i className={order?.status === 'pending' ? 'fal fa-clock text-yellow-500 pb-1' : 'fal fa-home text-green-600 pb-1'}></i>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {deletingOrder && <DeleteOrderModal deletingOrder={deletingOrder} setDeletingOrder={setDeletingOrder} refetch={refetch} />}
                {shippingOrder && <ShippedOrderModal shippingOrder={shippingOrder} setDeletingOrder={setDeletingOrder} refetch={refetch} />}
            </div>
        </div>
    );
};

export default AllOrders;