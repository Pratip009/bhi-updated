/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from "react";
import {
    Shield,
    Mail,
    Phone,
    Lock,
    Users,
    FileText,
    Database,
    Eye,
    CheckCircle,
} from "lucide-react";

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState(null);

    return (
        <div className="w-full bg-white">
            {/* ==== HERO TOP SECTION ==== */}
            <section className="w-full bg-black text-white py-24 px-6 text-center">
                <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
                    Privacy Policy
                </h1>
                <p className="max-w-2xl mx-auto text-lg sm:text-xl opacity-90 leading-relaxed">
                    Learn how we collect, protect, and manage your personal information while ensuring transparency and security at every step.
                </p>

            </section>

            {/* ==== PRIVACY POLICY CONTENT ==== */}
            <div className="w-full mx-auto py-20 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black mb-8">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    
                    <p className="text-lg text-gray-700 w-full mx-auto leading-relaxed">
                        At Bright Horizon Institute, your privacy is important to us. This
                        Privacy Policy outlines how we collect, use, share, and protect your
                        personal information when you interact with our services, both
                        online and offline. By using our website or enrolling in our
                        programs, you agree to the practices described in this policy.
                    </p>
                </div>

                {/* Section 1 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <Database className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            1. How We Collect Your Personal Information
                        </h2>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 pl-18">
                        <li>Online registration forms and sign-in sheets</li>
                        <li>Email communications</li>
                        <li>Website cookies and analytics tools</li>
                        <li>Phone calls or text messages</li>
                        <li>Offline interactions during workshops or events</li>
                    </ul>
                </div>

                {/* Section 2 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            2. What Personal Information We Collect
                        </h2>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 pl-18">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number (including mobile for SMS communication)</li>
                        <li>Mailing address</li>
                        <li>City/State/Zip</li>
                        <li>IP address (when visiting our website)</li>
                        <li>Payment and billing information</li>
                        <li>Identification documents (e.g., driver's license)</li>
                    </ul>
                </div>

                {/* Section 3 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            3. How We Use Your Personal Information
                        </h2>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 pl-18">
                        <li>Register you for workshops and training</li>
                        <li>Provide customer service and program updates</li>
                        <li>Communicate via SMS or email (with your consent)</li>
                        <li>Process payments and issue receipts</li>
                        <li>Improve user experience and course offerings</li>
                        <li>Share important scheduling or policy updates</li>
                    </ul>
                </div>

                {/* Section 4 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            4. How and Why We Share Personal Information with Third Parties
                        </h2>
                    </div>
                    <p className="text-gray-700 space-y-3">
                        We may share your data with trusted service providers to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 pl-6 space-y-2">
                        <li>Process transactions (e.g., payment processors)</li>
                        <li>Send communications (e.g., SMS/email platforms)</li>
                        <li>Maintain our website or internal systems</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                        We do not sell or share your personal information with third parties
                        for marketing purposes.
                    </p>
                </div>

                {/* Section 5 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <Phone className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            5. SMS Consent and Communication
                        </h2>
                    </div>
                    <p className="text-gray-700 space-y-3">
                        Mobile Opt-In, SMS Consent, and phone numbers collected for SMS
                        communication purposes will not be shared with any third party or
                        affiliates for marketing purposes. You may receive updates about
                        schedules, reminders, and relevant information. You can opt out at
                        any time by replying "STOP" to our messages.
                    </p>
                    <p className="font-semibold">
                        Note: We do not share mobile opt-in data with third parties or
                        affiliates for marketing or promotional purposes.
                    </p>
                </div>

                {/* Section 6 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <Database className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            6. Data Retention
                        </h2>
                    </div>
                    <p className="text-gray-700">
                        We retain personal information only as long as necessary to fulfill
                        the purposes outlined in this policy, unless a longer retention
                        period is required by law.
                    </p>
                </div>

                {/* Section 7 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            7. How We Protect Your Information
                        </h2>
                    </div>
                    <p className="text-gray-700">
                        We implement appropriate administrative, technical, and physical
                        safeguards to protect your data from unauthorized access,
                        disclosure, or misuse.
                    </p>
                </div>

                {/* Section 8 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            8. Your Rights
                        </h2>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Request access to your data</li>
                        <li>Request correction or deletion of your personal information</li>
                        <li>Withdraw your consent for communication at any time</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                        To exercise these rights, please contact us using the information
                        below.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="mb-20">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">9. Contact Us</h2>
                    </div>

                    <div className="space-y-4 text-gray-700 pl-18">
                        <p className="text-xl font-semibold text-black">
                            Bright Horizon Institute
                        </p>
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-black" />
                            <p>admin@bhilearning.com</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-black" />
                            <p>551-344-1485</p>
                        </div>
                        <p className="mt-6">
                            This privacy policy may be updated periodically. Please check back
                            to stay informed about our privacy practices.
                        </p>
                        <p className="font-semibold text-black mt-4">
                            Last updated: 07/26/2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
