import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaEnvelopeOpenText,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaTiktok,
} from "react-icons/fa";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="pt-20 pb-12 bg-[#3730a3]">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-8 border-b-[1.5px] border-white border-opacity-20">
        <div className="">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="mb-4"
          />
          <p className="text-white text-opacity-80">
            Bright Horizon Institute helps you build real skills for real
            careers learn fast, train smart, and step into the workforce with
            confidence.
          </p>
          <div className="flex items-center space-x-4 mt-6">
            <a href="https://www.facebook.com/people/Bright-Horizon-Institute/61589229856640/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-6 h-6 text-blue-600 bg-white p-1 rounded-md" />
            </a>
            <a href="https://www.instagram.com/brighthorizoninstitute_bhi/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-6 h-6 text-pink-600 bg-white p-1 rounded-md" />
            </a>
            <a href="https://www.linkedin.com/company/bright-horizon-institute/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-6 h-6 text-sky-400 bg-white p-1 rounded-md" />
            </a>
            <a href="https://www.tiktok.com/@brighthorizoninstitute5?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="w-6 h-6 text-gray-800 bg-white p-1 rounded-md" />
            </a>
          </div>
        </div>
        {/* <div className="">
          <h1 className="footer__heading">Popular Courses</h1>
          <div className="flex flex-col">
            <Link href="/course/2" className="footer__link">
              Medical Assistant
            </Link>
            <Link href="/course/3" className="footer__link">
              Med. Billing & Coding
            </Link>
            <Link href="/course/7" className="footer__link">
              Web Design
            </Link>
            <Link href="/course/15" className="footer__link">
              Patient Care Technician
            </Link>
            <Link href="/course/17" className="footer__link">
              Home Health Aide
            </Link>
            <Link href="/course/18" className="footer__link">
              CompTIA A+
            </Link>
          </div>
        </div> */}
        <div className="">
          <h1 className="footer__heading">Quick Links</h1>
          <div className="flex flex-col">
            <Link href="/" className="footer__link">
              Home
            </Link>

            <Link href="/course" className="footer__link">
              Courses
            </Link>

            <Link href="/quick-programs" className="footer__link">
              Quick Programs
            </Link>

            <Link href="/contact" className="footer__link">
              Contact
            </Link>

            <Link href="/terms-conditions" className="footer__link">
              Terms & Conditions
            </Link>

            <Link href="/privacy-policy" className="footer__link">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="">
          <h1 className="footer__heading">Contact Us</h1>

          <div className="space-y-3">
            {/* Phone */}
            <a
              href="tel:2013771594"
              className="footer__link flex items-center gap-2"
            >
              <FaPhone className="hover:text-green-600" size={18} />
              201-377-1594
            </a>

            {/* Email */}
            <a
              href="mailto:admin@bhilearning.com"
              className="footer__link flex items-center gap-2"
            >
              <FaEnvelope className="hover:text-green-600" size={18} />
contactus@bhilearning.com             </a>

            {/* Address opens Google Maps */}
            <a
              href="https://www.google.com/maps?q=591+Summit+Ave,+Suite+400,+Jersey+City,+NJ+07306"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link flex items-center gap-2"
            >
              <FaMapMarkerAlt className="hover:text-green-600" size={18} />
              910 Bergen Ave Floor 3 Jersey City, New Jersey NJ 07306
            </a>
          </div>
        </div>

        {/* <div className="">
          <h1 className="footer__heading">Subscribe our Newsletter</h1>
          <input
            type="text"
            placeholder="Enter your email"
            className="px-6 py-2 rounded-lg outline-none bg-gray-700 w-full text-white"
          />
          <button className="px-6 py-2 mt-4 rounded-lg outline-none bg-rose-700 w-full text-white">
            Subscribe
          </button>
        </div> */}
      </div>
      <p className="text-base text-center mt-4 text-white text-opacity-70">
        @2025 Bright Horizon Institute. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
