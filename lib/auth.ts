import { supabase } from "./supabaseClient";

// Login with email & password
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Login error:", error);
    return { data, error };
  }

  // Wait for session to be established
  await supabase.auth.getSession();
  
  console.log("Login successful, user:", data.user?.email);
  
  return { data, error };
};

// Logout
export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (!error) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  return { error };
};

// Get current user
export const getUser = () => {
  return supabase.auth.getUser();
};

// Helper: Get user role from database
export const getUserRole = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching role:", error);
    return null;
  }

  return data?.role;
};