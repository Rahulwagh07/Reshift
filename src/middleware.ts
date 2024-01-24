import { NextResponse } from 'next/server';
import {jwtVerify } from 'jose';
import { getJwtSecretKey } from './lib/getJwtSecretKey';
import type { NextRequest } from 'next/server';
 
export async function middleware(request: NextRequest) {
    let token: string | undefined;
    const body = await request.text();
    
    let requestBody;
    try {
        requestBody = JSON.parse(body);
    } catch (error) {
        console.error('Error parsing request body:', error);
    }
    token = requestBody?.token;

    // If not found in body  check cookies and headers
    if (!token) {
    token = request.cookies.get('token')?.value ||
            request.headers.get('Authorization')?.replace('Bearer ', '');
    }
    // if(!token){
    //     return NextResponse.json({
    //         message: "Token not Found",
    //     }, {status: 401})
    // }

    if (token) {
        try {
            const { payload } = await jwtVerify(token, getJwtSecretKey());
            const newHeaders = new Headers(request.headers)
            const userId = (payload as { id: string }).id;
            const email = (payload as { email: string }).email;
            newHeaders.set('userId', userId);
            newHeaders.set('email', email);
            // And produce a response with the new headers
            return NextResponse.next({
            request: {
                // New request headers
                headers: newHeaders,
            },
            })
        } catch (error) {
            return NextResponse.json({
                success: false,
                message: 'JWT VERIFICATION FAILED',
            });
        }
    }   
}

export const config = {
    matcher: [
        '/dashboard',
        '/admin/project',
        '/api/admin/project',
    ],
};