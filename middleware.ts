import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-in-production');

// Public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/'];

// Protected routes that require authentication
const protectedRoutes = ['/courses', '/lesson', '/tracker', '/roadmap', '/resources', '/projects'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('auth-token')?.value;

  // Check if route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If it's a public route, allow access
  if (isPublicRoute) {
    // If user is authenticated and trying to access login/signup, redirect to courses
    if (token && (pathname === '/login' || pathname === '/signup')) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/courses', request.url));
      } catch (error) {
        // Token is invalid, continue to login page
      }
    }
    return NextResponse.next();
  }

  // If it's a protected route, verify authentication
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
