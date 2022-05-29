import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
const MyReview = () => {
    const [user] = useAuthState(auth)

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async data => {
        const review = {
            name: user.displayName,
            photo: user.photoURL,
            email: user.email,
            short_description: data.short_description,
            rating: data.rating,

        }
        // send to your database 
        fetch('https://elite-toolboxes.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Review added successfully')
                    reset();
                }
                else {
                    toast.error('Failed to add the review');
                }
            })



    }

    return (
        <div>
            <div>
                <>
                    <div>
                        <div className="justify-center flex object-center items-center">

                            <div className="items-center flex justify-center">
                                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <input type="hidden" name="remember" defaultValue="true" />
                                    <div className="rounded-md -space-y-px">
                                        <h2 className='text-center text-2xl font-medium'>You will be reviewing as {user.displayName}.
                                            <br />Be careful about what you write</h2>
                                        <div>
                                            <label htmlFor="rating" className="sr-only">
                                                Rating
                                            </label>
                                            <input
                                                style={{ width: '300px' }}
                                                name="rating"
                                                type="number"
                                                min={1}
                                                max={5}
                                                {...register("rating", { required: true })}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                                                placeholder="Rating"
                                            />
                                        </div>
                                        <p className='text-red-500 mb-1'>{errors.rating && "*Rating is required"}</p>
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
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            style={{ width: '300px' }}
                                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Add Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </>
            </div>
        </div>
    );
};

export default MyReview;