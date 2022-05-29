import React from 'react';
import { toast } from 'react-toastify';

const ShippedOrderModal = ({ shippingOrder, refetch, setShippingOrder }) => {
    const { _id, name } = shippingOrder;
    console.log(shippingOrder)
    const handleShipped = () => {
        fetch(`https://elite-toolboxes.herokuapp.com/order/${_id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error(`You are not an admin. You can't do that`)
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    setShippingOrder(null);
                }
            })
        refetch();
        toast.success(`Order Shipped`)
    }

    return (
        <div>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className='flex justify-center items-center'>
                        <i className="fal fa-badge-check p-3 my-2 text-xl text-center bg-green-200 text-green-600 rounded-full"></i>
                    </div>
                    <h3 className="font-bold text-lg text-green-600">Are you sure you want to ship {name}'s order, id:{_id}</h3>
                    <div className="modal-action flex gap-4">
                        <label htmlFor="delete-confirm-modal" className="cursor-pointer border-2 hover:border-green text-white hover:text-red-600 hover:bg-white p-2 rounded bg-red-600 border-red-600">Cancel</label>
                        <label onClick={handleShipped} htmlFor="delete-confirm-modal" className="cursor-pointer border-2 hover:border-green text-white hover:text-green-400 hover:bg-white p-2 rounded bg-green-400 border-green-400">Confirm</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippedOrderModal;