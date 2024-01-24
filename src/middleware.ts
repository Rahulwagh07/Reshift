import { NextResponse } from 'next/server';
import { JWTPayload, jwtVerify } from 'jose';
import { getJwtSecretKey } from './lib/getJwtSecretKey';
import type { NextRequest } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';
 
interface ExtendedRequest extends NextRequest {
    user : JwtPayload;
}
export async function middleware(request: ExtendedRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/';

    const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.replace('Bearer ', '');

    if (isPublicPath && token) {
        
        try {
            const { payload } = await jwtVerify(token, getJwtSecretKey());
            request.user = payload;   //To do ?????
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl));  
        } catch (error) {
            return NextResponse.json({
                success: false,
                message: 'JWT VERIFICATION FAILED',
            });
        }
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};