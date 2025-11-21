'use client'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from 'react'
import SliderCard from './SliderCard';



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
        slidesToSlide: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1324 },
        items: 1,
        slidesToSlide: 1
    },
    tablet: {
        breakpoint: { max: 1324, min: 764 },
        items: 1,
        slidesToSlide: 1
    },
    mobile: {
        breakpoint: { max: 764, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};
const Slider = () => {
    return (
        <Carousel additionalTransfrom={0} arrows={true} autoPlay={true} autoPlaySpeed={3000} centerMode={false} infinite responsive={responsive} itemClass='item' >
            <SliderCard image="/images/r1.jpg" name="Jessica Doe" role="Web Developer" message="The Medical Assistant program was incredibly supportive and skill-focused. The instructors explained every procedure with patience and made sure we were job-ready with real clinical practice. Thanks to Bright Horizon Institute, I secured a full-time MA position right after graduation." />
            <SliderCard image="/images/r2.jpg" name="John Doe" role="Next js Developer" message="Bright Horizon Institute gave me the confidence and hands-on experience I needed to break into IT. The CompTIA A+ training was practical, clear, and aligned with real support desk scenarios. I landed my first tech role within weeks of completing the program." />
            <SliderCard image="/images/r3.jpg" name="Jonas Doe" role="Mern Developer" message="The Java programming classes were structured, beginner-friendly, and very industry-oriented. The projects helped me understand real development workflows, and the guidance I received boosted my confidence as a programmer. I’m now working as a junior Java developer—all thanks to Bright Horizon Institute." />
        </Carousel>
    )
}

export default Slider