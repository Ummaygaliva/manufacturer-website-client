import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Banner.css";

// import required modules
import { Pagination } from "swiper";

const Banner = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper -mb-20"
            >
                <SwiperSlide className="h-80 w-auto"><img alt="" src="https://www.mhttools.com/template/en/images/banner3.jpg"></img></SwiperSlide>
                <SwiperSlide className="h-80 w-auto"><img alt="" src="https://www.mhttools.com/template/en/images/banner2.jpg"></img></SwiperSlide>
                <SwiperSlide className="h-80 w-auto"><img alt="" src="https://www.mhttools.com/template/en/images/banner1.jpg"></img></SwiperSlide>

            </Swiper>
        </>
    );
};

export default Banner;
