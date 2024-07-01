import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/signin', '/signup', '/','/dashboard'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request , secret:"12121212"});
  const url = new URL(request.url);

    if((url.pathname=== '/')){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  if (token && (url.pathname.startsWith('/signin') || url.pathname.startsWith('/signup') || url.pathname === '/')) {
    console.log(token);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect to sign-in page if the user is not authenticated and trying to access any page other than sign-in
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}