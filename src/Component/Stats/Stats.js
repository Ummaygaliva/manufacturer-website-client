import React from 'react';

const Stats = () => {
    return (
        <div>
            <section className="text-center bg-white" style={{ fontFamily: 'Koulen, Cursive' }}>
                <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                    <ul className="grid grid-cols-2 gap-4 border-2 border-teal-600 rounded-xl lg:grid-cols-4">
                        <li className="p-8">
                            <i className="fas fa-star fa-spin text-teal-500 text-xl"></i>
                            <p className="text-2xl font-extrabold text-teal-500">33k+</p>
                            <p className="mt-1 text-lg font-medium">Reviews</p>
                        </li>

                        <li className="p-8">
                            <i className="fal fa-users fa-bounce text-teal-500 text-xl"></i>
                            <p className="text-2xl font-extrabold text-teal-500">190+</p>
                            <p className="mt-1 text-lg font-medium">Happy clients</p>
                        </li>

                        <li className="p-8">
                            <i className="fal fa-money-bill-1-wave text-teal-500 fa-fade text-2xl"></i>
                            <p className="text-xl font-extrabold text-teal-500">$150M+</p>
                            <p className="mt-1 text-lg font-medium">Annual revenue</p>
                        </li>

                        <li className="p-8">
                            <i className="fal fa-screwdriver-wrench text-teal-500 fa-flip text-2xl"></i>
                            <p className="text-xl font-extrabold text-teal-500">80+</p>
                            <p className="mt-1 text-lg font-medium">Tools</p>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Stats;