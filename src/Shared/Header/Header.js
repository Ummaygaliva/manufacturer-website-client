import { Fragment, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';


export default function Header() {
    const [open, setOpen] = useState(false)
    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }
    if (user) {
    }


    return (
        <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-white overscroll-none">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                                <div className="px-4 pt-5 pb-2 flex">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}



                                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                    <div className="flow-root">
                                        <Link to="/tools" className="-m-2 p-2 block font-medium text-gray-900">
                                            Tools
                                        </Link>
                                    </div>
                                    <div className="flow-root">
                                        <Link to="/blog" className="-m-2 p-2 block font-medium text-gray-900">
                                            Blog
                                        </Link>
                                    </div>
                                    <div className="flow-root">
                                        <Link to="/portfolio" className="-m-2 p-2 block font-medium text-gray-900">
                                            My portfolio
                                        </Link>
                                    </div>
                                    {user && <div className="flow-root">
                                        <Link to="/dashboard" className="-m-2 p-2 block font-medium text-gray-900">
                                            Dashboard
                                        </Link>
                                    </div>}
                                    <div className="flow-root">
                                        <Link to="/about" className="-m-2 p-2 block font-medium text-gray-900">
                                            About
                                        </Link>
                                    </div>

                                </div>
                                {

                                }


                                <div className="hidden lg:ml-8 lg:flex">
                                    <Link to="#" className="text-gray-700 hover:text-gray-800 flex items-center">
                                        <img
                                            src={user?.photoURL}
                                            alt=""
                                            className="w-12 h-12 block border border-black rounded-full flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-sm font-medium">BD</span>
                                        <span className="sr-only">, change currency</span>
                                    </Link>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-white">

                <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="h-16 flex items-center">
                            <button
                                type="button"
                                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link to="/">
                                    <span className="sr-only">Workflow</span>
                                    <img
                                        className="h-12 w-12 select-none"
                                        src="https://i.ibb.co/Q6nSX8P/logo.png"
                                        alt=""
                                    />
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="h-full flex space-x-8">
                                    <Popover className="flex">
                                        {({ open }) => (
                                            <>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                        <div className="relative bg-white">
                                                            <div className="max-w-7xl mx-auto px-8">
                                                                <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Popover>

                                    <Link to='/Tools'
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        Tools
                                    </Link>
                                    <Link to='/blog'
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        Blog
                                    </Link>
                                    <Link to='/portfolio'
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        My portfolio
                                    </Link>
                                    {user && <Link to='/dashboard'
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        Dashboard
                                    </Link>}
                                    <Link to='/about'
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        About
                                    </Link>

                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">
                                <div className="flex flex-1 items-center justify-end space-x-6">
                                    {user ? <>
                                        <p className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            {user.displayName}
                                        </p>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <Link onClick={logout} to="/signIn" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Sign out
                                        </Link></> : <>
                                        <Link to="/signIn" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Sign in
                                        </Link>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <Link to="/signUp" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Create account
                                        </Link></>}
                                </div>
                                <label htmlFor="dashboard-sidebar" className="px-3 py-2 rounded lg:hidden"><i className="fal fa-bars text-xl font-medium text-gray-400"></i></label>
                                {user ? <div className="hidden lg:ml-8 lg:flex">
                                    <Link to="#" className="text-gray-700 hover:text-gray-800 flex items-center z-10">
                                        <img
                                            src={user?.photoURL}
                                            alt=""
                                            className="w-12 h-12 blockflex-shrink-0 z-0 border border-black rounded-full"
                                        />

                                    </Link>
                                </div> : null}

                                {/* Search */}


                                {/* Cart */}

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}