'use client'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from 'react'
import SliderCard from './SliderCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1324 }, items: 1 },
    tablet: { breakpoint: { max: 1324, min: 764 }, items: 1 },
    mobile: { breakpoint: { max: 764, min: 0 }, items: 1 }
};

// Custom Left Arrow
const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10"
    >
        <FaChevronLeft className="text-black text-lg" />
    </button>
);

// Custom Right Arrow
const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10"
    >
        <FaChevronRight className="text-black text-lg" />
    </button>
);

const Slider = () => {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            centerMode={false}
            infinite
            responsive={responsive}
            itemClass='item'
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
        >
            <SliderCard video="/videos/1.mp4" />
            <SliderCard video="/videos/2.mp4" />
            <SliderCard video="/videos/3.mp4" />
            <SliderCard video="/videos/4.mp4" />
            <SliderCard video="/videos/5.mp4" />
        </Carousel>
    )
}

export default Slider;
