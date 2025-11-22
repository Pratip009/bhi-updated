/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import ParticlesBackground from "@/components/helper/ParticlesBackground";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Hardcoded admin email
    const ADMIN_EMAIL = "pratip.bhi@gmail.com"; 

    const role = email === ADMIN_EMAIL ? "admin" : "user";

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          contact_number: contact,
          role: role, 
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert("Sign up successful! Check your email to confirm.");
      router.push("/signin");
    }
  };


  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700 overflow-hidden">
      {/* Fullscreen Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Left Side - Text + Illustration */}
      <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center items-start p-16 space-y-10 text-white relative z-10">
        <div className="space-y-6">
          <h1 className="text-6xl font-extralight leading-snug tracking-wide">
            Welcome to Our
            <span className="block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mt-2">
              Platform
            </span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed max-w-lg tracking-wide">
            Join thousands of users and access exclusive features. Stay connected, grow with our
            vibrant community, and unlock new opportunities every day.
          </p>

          <p className="text-sm italic text-gray-400 tracking-wider">
            “Your journey starts here.”
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-5 space-y-2 mt-7 border border-white/20">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-light text-white mb-2">Create Account</h2>
              <p className="text-gray-300 text-sm">Get started with your free account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50/20 border border-red-200/20">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm font-medium text-red-200">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-white/20 border border-white/30 text-white rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/20 border border-white/30 text-white rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    className="w-full bg-white/20 border border-white/30 text-white rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/20 border border-white/30 text-white rounded-lg py-3 pl-11 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 active:bg-gray-900 text-white font-medium py-3.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-6 group"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>

            </div>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-sm text-gray-300">
                Already have an account?{" "}
                <a href="/signin" className="text-white font-semibold hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
