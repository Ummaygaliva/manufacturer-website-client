import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithGoogle, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../../Shared/Loading/Loading';


const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [token] = useToken(gUser || user);
    const navigate = useNavigate();
    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name, photoURL: data.photoURL || 'https://i.ibb.co/Q6nSX8P/logo.png' })
        navigate("/");


    }
    if (token) {
        navigate("/")

    }
    let signInError;
    if (error || gError || updateError) {
        signInError = <p className='text-red-400 text-center p-2 rounded-lg'>Elite Toolboxes Says: {error?.message.slice(17, -2) || gError?.message.slice(17, -2) || updateError?.message.slice(17, -2)}</p>
    }
    return (
        <div>
            <section className="relative py-20 2xl:py-40 bg-gray-800 overflow-hidden">
                <img className="hidden lg:block absolute inset-0 mt-32" src="zospace-assets/lines/line-mountain.svg" alt="" />

                <img className="hidden lg:block absolute inset-y-0 right-0 -mr-40 -mt-32" src="zospace-assets/lines/line-right-long.svg" alt="" />
                <div className="relative container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-wrap items-center -mx-4">
                            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                                <div className="max-w-md">
                                    <span className="text-lg text-blue-400 font-bold">Register Account</span>
                                    <h2 className="mt-8 mb-12 text-3xl font-bold font-heading text-white">Welcome to Elite Toolboxes. Finish Signing Up here to continue further steps</h2>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 px-4">
                                <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gray-600 rounded-lg">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <h3 className="mb-10 text-2xl text-white font-bold font-heading">Register Account</h3>
                                        <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                                            <span className="inline-block pr-3 py-2 border-r border-gray-50">
                                                <i className="fal fa-user-plus"></i>
                                            </span>
                                            <input {...register("name", { required: true })} className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="text" placeholder="John Doe" />

                                        </div>
                                        <p className='text-red-500 mb-1'>{errors.name?.type === 'required' && "*Name is required"}</p>
                                        <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                                            <span className="inline-block pr-3 py-2 border-r border-gray-50">
                                                <i className="fal fa-envelope-circle-check"></i>
                                            </span>
                                            <input name='email' {...register("email", { required: true })} className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="email" placeholder="johndoe@elitetoolboxes.com" />
                                        </div>
                                        <p className='text-red-500 mb-1'>{errors.email && "* Email is required"}</p>
                                        <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                                            <span className="inline-block pr-3 py-2 border-r border-gray-50">
                                                <i className="fal fa-circle-user"></i>
                                            </span>
                                            <input {...register("photoURL")} className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="text" placeholder="Your profile image" />
                                        </div>

                                        <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                                            <span className="inline-block pr-3 py-2 border-r border-gray-50">
                                                <i className="fal fa-lock"></i>
                                            </span>
                                            <input {...register("password", { required: true })} className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="password" placeholder="Password" />
                                        </div>
                                        <p className='text-red-500 mb-1'>{errors.password && "*Password is required"}</p>
                                        <button className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200">{loading || updating ? <Loading /> : 'Sign Up'}</button>
                                    </form>
                                    <div className="relative flex py-1 items-center">
                                        <div className="flex-grow border-t border-indigo-400"></div>
                                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                                        <div className="flex-grow border-t border-indigo-400"></div>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <button onClick={() => signInWithGoogle()} className='flex items-center justify-center gap-3 border border-white p-2 rounded-3xl text-white'><img className='h-5 w-5 select-none' alt='google_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'></img> {gLoading ? <Loading /> : 'Continue with google'} </button>
                                    </div>
                                    <div className="relative flex py-1 items-center text-center justify-center">
                                        <span className="flex-shrink mx-4 text-gray-400 text-center">Already have an account? <Link to="/SignIn" className='no-underline'><span className='text-blue-500'>Sign In Here</span></Link> </span>
                                    </div>
                                    {signInError}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignUp;