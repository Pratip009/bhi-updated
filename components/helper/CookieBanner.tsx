'use client'
import React, { useState, useEffect } from "react";
import CookieSettingsModal from "./CookieSettingsModal";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("bhi_cookie_consent");
    if (!consent) setShowBanner(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem("bhi_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const rejectAll = () => {
    localStorage.setItem("bhi_cookie_consent", "rejected");
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[80%] bg-white border border-gray-200 shadow-2xl rounded-xl p-6 z-50 flex flex-col md:flex-row items-center justify-between gap-4 animate-slide-up">
          {/* Text Section */}
          <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed md:leading-snug">
            By clicking <span className="font-semibold">“Accept All Cookies”</span>, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.{" "}
            <a href="/cookie-policy" className="underline text-blue-600 hover:text-blue-800 transition">Cookie Policy</a>
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-2 justify-center md:justify-end mt-3 md:mt-0">
            <button
              onClick={rejectAll}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition shadow-sm"
            >
              Reject All
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm"
            >
              Cookies Settings
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <CookieSettingsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default CookieBanner;
