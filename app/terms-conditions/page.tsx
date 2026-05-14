/* eslint-disable react/no-unescaped-entities */
'use client'

import { Shield, Bell, MessageSquare, StopCircle, Mail, Phone, HelpCircle, FileCheck } from "lucide-react";

export default function TermsConditions() {
    return (
        <div className="w-full bg-white">

            {/* ==== HERO TOP SECTION ==== */}
            <section className="w-full bg-black text-white py-24 px-6 text-center">
                <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
                    SMS Terms & Conditions
                </h1>
                <p className="max-w-2xl mx-auto text-lg sm:text-xl opacity-90 leading-relaxed">
                    Learn how SMS communication, user consent, frequency, and opt-out processes work at Bright Horizon Institute.
                </p>
            </section>

            {/* ==== PAGE CONTENT ==== */}
            <div className="w-full mx-auto py-20 px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black mb-8">
                        <Shield className="w-10 h-10 text-white" />
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed w-full mx-auto">
                        These Terms & Conditions outline how SMS messaging is used for communication
                        with students and prospects. By opting in, you agree to receive relevant
                        communication including updates, reminders, and support messages.
                    </p>
                </div>

                {/* Section 1 */}
                <div className="mb-16 border-b border-gray-200 pb-12 ">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <FileCheck className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            1. Privacy and Data Use
                        </h2>
                    </div>
                    <p className="text-gray-700">
                        The phone number collected during the SMS opt-in process will not be shared
                        with third parties for marketing purposes.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            2. Types of SMS Messages You May Receive
                        </h2>
                    </div>
                    <ul className="text-gray-700 list-disc list-inside space-y-2">
                        <li>Appointment reminders</li>
                        <li>Follow-up messages</li>
                        <li>Billing inquiries</li>
                        <li>Course-related communication</li>
                        <li>General support messages</li>
                    </ul>
                </div>

                {/* Section 3 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            3. Frequency of Messages
                        </h2>
                    </div>
                    <p className="text-gray-700">
                        You may receive 5–10 messages per week depending on activity, inquiries, or scheduled programs.
                    </p>
                </div>

                {/* Section 4 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <StopCircle className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            4. Opt-Out Rights
                        </h2>
                    </div>
                    <p className="text-gray-700">
                        You may opt-out of SMS messaging at any time by replying <strong>"STOP"</strong> to any message.
                        Standard messaging and data rates may apply depending on your mobile carrier.
                    </p>
                </div>

                {/* Section 5 */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <HelpCircle className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">
                            5. Support and Assistance
                        </h2>
                    </div>
                    <p className="text-gray-700">
                        If you need help, reply <strong>"HELP"</strong> or contact us using the information below.
                    </p>
                </div>

                {/* Contact Section */}
                <div>
                    <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black pt-2">6. Contact Information</h2>
                    </div>

                    <div className="space-y-4 text-gray-700">
                        <p className="text-xl font-semibold text-black">Bright Horizon Institute</p>

                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-black" />
                            <p>admin@bhilearning.com</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-black" />
                            <p>551-344-1485</p>
                        </div>

                        <p className="mt-6">
                            By continuing to use our services, you acknowledge and agree to these SMS Terms & Conditions.
                        </p>

                        <p className="font-semibold text-black mt-4">Last updated: 07/26/2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
