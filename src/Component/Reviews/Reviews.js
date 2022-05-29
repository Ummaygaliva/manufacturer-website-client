import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import { StarIcon } from '@heroicons/react/solid';
const Reviews = () => {
    const { data: reviews, isLoading } = useQuery('reviews', () => fetch('https://elite-toolboxes.herokuapp.com/reviews', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }
    return (
        <section style={{ fontFamily: 'Poppins, sans-serif' }} className="py-16 2xl:py-44 overflow-hidden bg-white">

            <h1 className='text-2xl text-center font-semibold uppercase py-2'>What client says about us</h1>

            <div className="container px-4 mx-auto grid lg:grid-cols-3 gap-4 bg-white">
                {reviews.slice(-3,).reverse().map(review =>
                    <div key={review?._id} className="md:mb-24 rounded-md overflow-hidden border border-gray-800">
                        <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
                            <div className="flex flex-wrap items-center">
                                <img className="mr-6 h-12 w-12 rounded-full" src={review?.photo} alt="" />
                                <h4 className="w-full md:w-auto text-xl font-heading font-medium">{review?.name}</h4>
                                <p className="w-full md:w-auto font-semibold">{review?.email.slice(0, -12)}***</p>
                                <div className="flex gap-1">
                                    Rating:  {review?.rating === '5' && <>
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                    </>}
                                    {review?.rating === '4' && <>
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                    </>}
                                    {review?.rating === '3' && <>
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                    </>}
                                    {review?.rating === '2' && <>
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                    </>}
                                    {review?.rating === '1' && <>
                                        <StarIcon className="h5 w-5 text-yellow-300" />
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                        <i className="fal fa-star text-yellow-300 h5 w-5 pt-1"></i>
                                    </>}
                                    /<StarIcon className="h5 w-5 text-yellow-300" />
                                    <StarIcon className="h5 w-5 text-yellow-300" />
                                    <StarIcon className="h5 w-5 text-yellow-300" />
                                    <StarIcon className="h5 w-5 text-yellow-300" />
                                    <StarIcon className="h5 w-5 text-yellow-300" />

                                </div>
                            </div>
                        </div>
                        <div className="px-4 md:px-16 pt-8 pb-12 bg-white">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-2/3 mb-6 md:mb-0">
                                    <p className="mb-8 max-w-2xl text-md text-darkBlueGray-400 leading-loose">{review?.short_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </section>
    );
};

export default Reviews;