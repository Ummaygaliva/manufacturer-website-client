import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="bg-white pt-5">
                <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
                    <div className="p-5">
                        <img alt='' className='justify-center items-center flex h-40 w-40' src='https://i.ibb.co/nRYdY2n/attachment-90071703-removebg-preview.png'></img>

                    </div>
                    <div className="p-5">
                        <div className="text-sm uppercase text-indigo-600 font-bold">Resources</div>
                        <a className="my-3 block" href="/#">Documentation <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Tutorials <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Support <span className="text-teal-600 text-xs p-1">New</span></a>
                    </div>
                    <div className="p-5">
                        <div className="text-sm uppercase text-indigo-600 font-bold">Support</div>
                        <a className="my-3 block" href="/#">Help Center <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Privacy Policy <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Conditions <span className="text-teal-600 text-xs p-1"></span></a>
                    </div>
                    <div className="p-5">
                        <div className="text-sm uppercase text-indigo-600 font-bold">Contact us</div>
                        <a className="my-3 block" href="/#">114 1134, Floor 4 San Francisco, CA <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">contact@elitetoolboxes.com <span className="text-teal-600 text-xs p-1"></span></a>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100">
                <div className="flex pb-1 px-3 m-auto pt-1 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center">
                    <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">

                    </div>
                    <div className="my-1">© Copyright Elite Toolboxes. All Rights Reserved.</div>
                </div>
            </div>


        </div >
    );
};

export default Footer;