import React from 'react';
import Banner from '../Banner/Banner';
import Contact from '../Contact/Contact';
import Newsletter from '../Newsletter/Newsletter';
import Reviews from '../Reviews/Reviews';
import Stats from '../Stats/Stats';
import Tools from '../Tools/Tools';

const Home = () => {
    return (
        <div>
            <Banner />
            <Tools />
            <Reviews />
            <Stats />
            <Contact />
            <Newsletter />
        </div>
    );
};

export default Home;