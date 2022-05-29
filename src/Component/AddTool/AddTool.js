import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddTool = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorageKey = '3a51b76afc07aa9158348f0fd94f0c8f';

    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const tool = {
                        name: data.name,
                        short_description: data.short_description,
                        minimum_order_quantity: data.minimum_order_quantity,
                        available_quantity: data.available_quantity,
                        price: data.price,
                        image: img,
                    }
                    // send to your database 
                    fetch('https://elite-toolboxes.herokuapp.com/tool', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(tool)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                toast.success('Tool added successfully')
                                reset();
                            }
                            else {
                                toast.error('Failed to add the tool');
                            }
                        })

                }

            })
    }



    return (
        <div>
            <>
                <div>
                    <div className="justify-center flex object-center items-center">

                        <div className="items-center justify-center">
                            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="rounded-md -space-y-px">
                                    <div className='mb-2'>
                                        <label htmlFor="email-address" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            style={{ width: '300px' }}
                                            name="name"
                                            type="name"
                                            {...register("name", { required: true })}
                                            className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Tool Name"
                                        />
                                    </div>
                                    <p className='text-red-500 mb-1'>{errors.name && "* Name is required"}</p>
                                    <div>
                                        <label htmlFor="price" className="sr-only">
                                            Price
                                        </label>
                                        <input
                                            style={{ width: '300px' }}
                                            name="price"
                                            type="number"
                                            {...register("price", { required: true })}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                                            placeholder="Price"
                                        />
                                    </div>
                                    <p className='text-red-500 mb-1'>{errors.price && "*Price is required"}</p>
                                    <div>
                                        <label htmlFor="available_quantity" className="sr-only">
                                            Quantity
                                        </label>
                                        <input
                                            style={{ width: '300px' }}
                                            name="available_quantity"
                                            type="number"
                                            {...register("available_quantity", { required: true })}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                                            placeholder="Quantity"
                                        />
                                    </div>
                                    <p className='text-red-500 mb-1'>{errors.available_quantity && "*Quantity is required"}</p>
                                    <div>
                                        <label htmlFor="minimum_order_quantity" className="sr-only">
                                            Quantity
                                        </label>
                                        <input
                                            style={{ width: '300px' }}
                                            name="minimum_order_quantity"
                                            type="number"
                                            {...register("minimum_order_quantity", { required: true })}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                                            placeholder="Minimum Order Quantity"
                                        />
                                    </div>
                                    <p className='text-red-500 mb-1'>{errors.minimum_order_quantity && "*Minimum Order Quantity is required"}</p>
                                    <div>
                                        <label htmlFor="short_description" className="sr-only">
                                            Short description
                                        </label>
                                        <textarea
                                            style={{ width: '300px' }}
                                            name="short_description"
                                            type="text"
                                            {...register("short_description", { required: true })}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                                            placeholder="Short description"
                                        />
                                    </div>
                                    <p className='text-red-500 mb-1'>{errors.short_description && "*Short description is required"}</p>
                                    <div>
                                        <label htmlFor="short_description" className="sr-only">
                                            Photo
                                        </label>
                                        <input
                                            style={{ width: '300px' }}
                                            name="image"
                                            type="file"
                                            {...register("image", { required: true })}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                                            placeholder="Photo"
                                        />
                                    </div>
                                    <p className='text-red-500 mb-1'>{errors.image && "*Photo is required"}</p>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        style={{ width: '300px' }}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Add Tool
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        </div>
    );
};

export default AddTool;