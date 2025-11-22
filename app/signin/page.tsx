/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import ParticlesBackground from "@/components/helper/ParticlesBackground";
import { Lock, Eye, EyeOff, User } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in button clicked');
    setLoading(true);
    setError("");

    try {
      // Step 1: Sign in with Supabase
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      const user = authData?.user;

      if (!user) {
        setError("Authentication failed");
        setLoading(false);
        return;
      }

      console.log('✅ User signed in:', user.email);
      console.log('👤 User ID:', user.id);

      // Step 2: Fetch role from database
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (roleError) {
        console.error("Role fetch error:", roleError);
        setError("Could not fetch user role. Please contact support.");
        setLoading(false);
        return;
      }

      // Step 3: Determine role and update user metadata
      const role = roleData?.role || "user";
      
      console.log('📊 Role from database:', role);
      
      // Update user metadata with role
      const { error: updateError } = await supabase.auth.updateUser({
        data: { role }
      });

      if (updateError) {
        console.error('Failed to update user metadata:', updateError);
      } else {
        console.log('✅ User metadata updated with role');
      }

      // Verify session is active
      const { data: { session } } = await supabase.auth.getSession();
      console.log('🔐 Session after sign in:', !!session);
      console.log('🍪 Session user:', session?.user?.email);

      // Redirect based on role using Next.js router (no page reload)
      const redirectUrl = role === "admin" ? "/admin/dashboard" : "/";
      console.log('🎯 SIGN IN SUCCESS - Redirecting to:', redirectUrl);
      
      // Use Next.js router for client-side navigation
      router.push(redirectUrl);
      setLoading(false);

    } catch (err) {
      console.error("Unexpected login error:", err);
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParticlesBackground />
      </div>

      {/* Left Side - Text */}
      <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center items-start p-16 space-y-10 text-white">
        <div className="space-y-6">
          <h1 className="text-6xl font-extralight leading-snug tracking-wide">
            Welcome Back
            <span className="block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mt-2">
              Sign In
            </span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed max-w-lg tracking-wide">
            Access your account and continue your journey with us. Stay connected and unlock new opportunities every day.
          </p>

          <p className="text-sm italic text-gray-400 tracking-wider">
            "We're excited to see you again!"
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
        <div className="relative z-10 w-full max-w-md">
          <form
            onSubmit={handleSignIn}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col gap-4 text-white"
          >
            <h2 className="text-3xl font-light text-center mb-2">Sign In</h2>
            <p className="text-center text-gray-200 text-sm mb-4">
              Welcome back! Please login to continue.
            </p>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 border border-gray-300 text-white placeholder-gray-300 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Password Field with Toggle */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 border border-gray-300 text-white placeholder-gray-300 rounded-lg py-3 pl-11 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black/80 hover:bg-black text-white font-medium py-3.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-2"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <p className="text-center text-gray-200 text-sm mt-2">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-400 font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}