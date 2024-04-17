import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getJwtSecretKey } from './lib/getJwtSecretKey';
import type { NextRequest } from 'next/server';

const loginSignupPaths = ['/login', '/signup'];

const handleUnauthenticated = (request: NextRequest) => {
  if (!loginSignupPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
};

const handleAuthenticated = (request: NextRequest) => {
  if (loginSignupPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
};

const handleAuthorization = async (request: NextRequest, token: string) => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    const newHeaders = new Headers(request.headers);
    const userId = (payload as { id: string }).id;
    const email = (payload as { email: string }).email;
    const accountType = (payload as { accountType: string }).accountType;

    newHeaders.set('userId', userId);
    newHeaders.set('email', email);
    newHeaders.set('accountType', accountType);

    const isMemberPath = request.nextUrl.pathname.startsWith('/dashboard');
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

    if (isMemberPath && accountType === 'Admin') {
      return NextResponse.json(
        { message: 'Admins cannot access members dashboard paths.' },
        { status: 403 }
      );
    }

    if (isAdminPath && accountType === 'Member') {
      return NextResponse.json(
        { message: 'Members cannot access admin paths.' },
        { status: 403 }
      );
    }

    return NextResponse.next({
      request: {
        headers: newHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'JWT VERIFICATION FAILED',
    });
  }
};

export async function middleware(request: NextRequest) {
  const token =
    request.cookies.get('token')?.value ||
    request.headers
      .get('Authorization')
      ?.replace('Bearer ', '')
      .replace(/"/g, '');

  if (!token) {
    return handleUnauthenticated(request);
  }

  if (token) {
    const authenticated = handleAuthenticated(request);
    if (authenticated.status !== 200) {
      return authenticated;
    }

    return handleAuthorization(request, token);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/admin/project',
    '/api/admin/project',
    '/api/admin/createTask',
    '/api/acceptinvite',
    '/admin/dashboard',
    '/login',
    '/signup',
  ],
};