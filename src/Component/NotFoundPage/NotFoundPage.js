import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className='bg-white'>
            <h1 style={{ fontFamily: 'Odibee Sans, cursive' }} className='text-5xl font-semibold text-center'>OOPS! The page you are looking for is not found</h1>
            <div className=' flex justify-center items-center'>
                <Link style={{ fontFamily: 'Poppins, sans-serif' }}
                    className='bg-indigo-500 p-2 rounded text-center text-white hover:bg-white border hover:border-indigo-500 hover:text-indigo-500 my-12' to="/" >Go to Home</Link>
            </div>

            <div className='flex justify-center items-center'>
                <img alt='' className='text-center w-1/2' src='https://i.ibb.co/Bq4Rsmx/undraw-Page-not-found-re-e9o6.png'></img>
            </div>

        </div>
    );
};

export default NotFoundPage;