import React, { useEffect } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithGoogle, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import useToken from '../../hooks/useToken';
import Loading from '../../Shared/Loading/Loading';


const SignIn = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(user || gUser);
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    })
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";



    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    }
    let signInError;
    if (error || gError) {
        signInError = <p className='text-white text-center bg-red-400 p-2 rounded-lg'>Elite Toolboxes Says: {error?.message.slice(17, -2) || gError?.message.slice(17, -2)}</p>
    }


    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://i.ibb.co/Q6nSX8P/logo.png"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Sign in to your <span className='text-indigo-600'>Elite Toolboxes</span> account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    {...register("email", { required: true })}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <p className='text-red-500 mb-1'>{errors.email && "* Email is required"}</p>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    {...register("password", { required: true })}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                            <p className='text-red-500 mb-1'>{errors.password && "*Password is required"}</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgetPassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                {loading ? <Loading /> : 'Sign in'}
                            </button>
                        </div>
                    </form>
                    <div className="relative flex justify-center items-center">
                        <span className="flex-shrink mx-4 text-gray-400">Don't have an account? <Link to="/SignUp" className='no-underline'><span className='text-blue-500'>Sign Up Here</span></Link> </span>
                    </div>
                    <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-indigo-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-indigo-400"></div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button onClick={() => signInWithGoogle()} className='flex items-center justify-center gap-3 border border-gray-700 p-2 rounded-3xl'><img className='h-5 w-5 select-none' alt='google_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'></img> {gLoading ? <Loading /> : 'Continue with google'} </button>
                    </div>
                    {signInError}
                </div>
            </div>
        </>
    );
};

export default SignIn;