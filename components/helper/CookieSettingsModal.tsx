'use client'

import React, { useState } from 'react';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  if (!isOpen) return null;

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'necessary') return;
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const savePreferences = () => {
    localStorage.setItem('bhi_cookie_consent', 'custom');
    localStorage.setItem('bhi_cookie_settings', JSON.stringify(settings));
    onClose();
  };

  const acceptAll = () => {
    const allAccepted: CookieSettings = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setSettings(allAccepted);
    localStorage.setItem('bhi_cookie_consent', 'accepted');
    localStorage.setItem('bhi_cookie_settings', JSON.stringify(allAccepted));
    onClose();
  };

  const cookieCategories = [
    { key: 'necessary', title: 'Necessary Cookies', description: 'Essential for the website to function properly. These cannot be disabled.', icon: '🔒' },
    { key: 'functional', title: 'Functional Cookies', description: 'Enable enhanced functionality and personalization, such as videos and live chats.', icon: '⚙️' },
    { key: 'analytics', title: 'Analytics Cookies', description: 'Help us understand how visitors interact with our website by collecting and reporting information.', icon: '📊' },
    { key: 'marketing', title: 'Marketing Cookies', description: 'Used to track visitors across websites to display relevant advertisements.', icon: '🎯' },
  ] as const;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Cookie Preferences</h2>
            <p className="text-gray-300 text-sm">
              Manage your cookie settings and privacy preferences
            </p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white p-1" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)] space-y-4">
          {cookieCategories.map(category => (
            <div key={category.key} className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-all duration-200 hover:shadow-md flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
              </div>

              {/* Toggle */}
              <button
                onClick={() => toggleSetting(category.key as keyof CookieSettings)}
                disabled={category.key === 'necessary'}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                  settings[category.key as keyof CookieSettings] ? 'bg-gradient-to-r from-gray-900 to-gray-700' : 'bg-gray-300'
                } ${category.key === 'necessary' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    settings[category.key as keyof CookieSettings] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
            <span className="text-blue-600 text-xl">ℹ️</span>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">About Cookies</h4>
              <p className="text-sm text-blue-800">
                We use cookies to improve your browsing experience. You can change your preferences at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-6 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={savePreferences}
            className="px-6 py-2.5 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-all duration-200"
          >
            Save Preferences
          </button>
          <button
            onClick={acceptAll}
            className="px-6 py-2.5 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg font-medium hover:from-gray-800 hover:to-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettingsModal;
