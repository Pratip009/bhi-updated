import Image from 'next/image'
import React from 'react'
import { FaEnvelopeOpenText, FaFacebookF, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className='pt-20 pb-12 bg-black'>
            <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-8 border-b-[1.5px] border-white border-opacity-20">
                <div className="">
                    <Image src="/images/logo.png" alt="Logo" width={50} height={50} className='mb-4' />
                    <p className='text-white text-opacity-60'>Bright Horizon Institute helps you build real skills for real careers—learn fast, train smart, and step into the workforce with confidence.</p>
                    <div className="flex items-center space-x-4 mt-6">
                        <FaFacebookF className='w-6 h-6 text-blue-600' />
                        <FaInstagram className='w-6 h-6 text-pink-600' />
                        <FaLinkedin className='w-6 h-6 text-sky-400' />

                    </div>
                </div>
                <div className="">
                    <h1 className='footer__heading'>Popular Courses</h1>
                    <p className='footer__link'>Medical Assistant</p>
                    <p className='footer__link'>Med. Billing & Coding</p>
                    <p className='footer__link'>Web Design</p>
                    <p className='footer__link'>Patient Care Technician</p>
                    <p className='footer__link'>Home Health Aide</p>
                    <p className='footer__link'>CompTIA A+</p>
                </div>
                <div className="">
                    <h1 className='footer__heading'>Quick Links</h1>
                    <p className='footer__link'>Home</p>
                    <p className='footer__link'>Courses</p>
                    <p className='footer__link'>Quick Programs</p>
                    <p className='footer__link'>Contact</p>
                    <p className='footer__link'>Terms & Conditions</p>
                    <p className='footer__link'>Privacy Policy</p>
                </div>
                <div className="">
                    <h1 className='footer__heading'>Contact Us</h1>

                    <p className='footer__link'> 201-377-1594</p>
                    <p className='footer__link'>admin@bhilearning.com</p>
                    <p className='footer__link'>591 Summit Ave,Suite 400 Jersey City
                        NJ 07306
                    </p>
                </div>

                <div className="">
                    <h1 className='footer__heading'>Subscribe our Newsletter</h1>
                    <input type="text" placeholder='Enter your email' className="px-6 py-2 rounded-lg outline-none bg-gray-700 w-full text-white" />
                    <button className="px-6 py-2 mt-4 rounded-lg outline-none bg-rose-700 w-full text-white">Subscribe</button>
                </div>

            </div>
            <p className='text-base text-center mt-4 text-white text-opacity-70'>@2025 Bright Horizon Institute. All rights reserved.</p>
        </footer>
    )
}

export default Footer