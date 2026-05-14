import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  // Create Supabase client with service role for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role bypasses RLS
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            req.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: req,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("🔐 SESSION IN MIDDLEWARE:", session?.user?.email);
  console.log("📍 Accessing path:", req.nextUrl.pathname);
  console.log("🔑 Auth header:", req.headers.get("authorization"));

  // If no session and trying to access protected route, redirect to signin
  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    console.log("❌ No session - redirecting to signin");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If we have a session, check the role from the database
  if (session?.user && req.nextUrl.pathname.startsWith("/admin")) {
    try {
      // Query the user_roles table (service role bypasses RLS)
      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      console.log("📊 ROLE DATA FROM DB:", roleData);
      
      if (error) {
        console.error("❌ ROLE ERROR:", error);
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      const userRole = roleData?.role;

      // If role is not admin, redirect to unauthorized
      if (userRole !== "admin") {
        console.log("🚫 ACCESS DENIED - Role is:", userRole);
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      console.log("✅ ACCESS GRANTED - User is admin");
    } catch (error) {
      console.error("💥 Error fetching role:", error);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};