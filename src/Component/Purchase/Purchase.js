import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const Purchase = () => {
    const [tool, setTool] = useState();
    const minQuantity = parseInt(tool?.minimum_order_quantity);
    const maxQuantity = parseInt(tool?.available_quantity);
    const [quantity, setQuantity] = useState(minQuantity);
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://elite-toolboxes.herokuapp.com/tool/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTool(data)
            })
    }, [id])

    const current = new Date();
    const currentDate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const [user] = useAuthState(auth);
    const handleOrder = event => {


        event.preventDefault();
        const order = {
            toolId: tool._id,
            name: user.displayName,
            email: user.email,
            date: currentDate,
            quantity: quantity,
            price: tool.price,
            phone: event.target.phone.value,
            tool_name: tool.name,
            status: 'pending'

        }
        fetch("https://elite-toolboxes.herokuapp.com/order", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(`${tool.name} order done at, ${currentDate}`)
                }
                else {
                    toast.error(`Can't confirm order at. Please try again, ${currentDate}`)
                }
            })
    }



    return (
        <div>
            <div className="bg-white" style={{ fontFamily: 'Koulen, cursive' }}>
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li>
                                <div className="flex items-center">
                                    <Link to="/tools" className="mr-2 text-sm font-medium text-gray-900"> Tool </Link>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>

                            <li>
                                <div className="flex items-center">
                                    <Link to="/tools" className="mr-2 text-sm font-medium text-gray-900"> Plumbing </Link>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>

                            <li className="text-sm">
                                <p aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{tool?.name}</p>
                            </li>
                        </ol>
                    </nav>

                    <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">

                        <div style={{ minHeight: '300px', minWidth: '300px' }} className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4 object-center flex items-center justify-center">
                            <img src={tool?.image} alt={tool?.name} className="object-center object-contain  flex items-center justify-center p-20" />
                        </div>
                        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                            <div className="lg:col-span-2 lg:pr-8">
                                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{tool?.name}</h1>
                            </div>


                            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:pr-8">
                                <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{tool?.short_description}</p>
                                    </div>
                                </div>

                                <div className="mt-4 lg:mt-0 lg:row-span-3">
                                    <p className="text-3xl text-gray-900">$ {tool?.price}.00</p>
                                    <p className="text-3xl text-gray-900">Quantity: {tool?.available_quantity}</p>
                                    <form onSubmit={handleOrder}>
                                        <div className="mb-6">
                                            <label htmlFor="text" className="block mb-1 text-sm font-medium text-gray-900">Date</label>
                                            <input disabled type="text" value={currentDate} className="bg-gray-400 cursor-not-allowed select-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="text" className="block mb-1 text-sm font-medium text-gray-900">Your Name</label>
                                            <input type="text" disabled value={user?.displayName} className="bg-gray-400 cursor-not-allowed select-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="text" className="block mb-1 text-sm font-medium text-gray-900">Your Email</label>
                                            <input disabled type="text" value={user?.email} className="bg-gray-400 cursor-not-allowed select-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="text" className="block mb-1 text-sm font-medium text-gray-900">Your order quantity</label>
                                            <input name='my_quantity' defaultValue={minQuantity} max={maxQuantity} min={minQuantity} onChange={(e) => setQuantity(e.target.value)} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="text" className="block mb-1 text-sm font-medium text-gray-900">Your phone number</label>
                                            <input name='phone' type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>


                                        {/* <button disabled={true} className="mt-10 w-full bg-gray-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Confirm Order</button>
                                         */}
                                        <button type="submit" className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Confirm Order</button>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Purchase;