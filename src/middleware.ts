import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
export function middleware(request: NextRequest) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '') || request.cookies.get('token')?.value || '';
    console.log("TOKEN", token)
    if (!token) {
        return NextResponse.redirect('/login');
    }
    if (token) {
      if(jwt.verify(token, process.env.JWT_SECRET!)){
        console.log("JWT VERIFY", jwt.verify(token, process.env.JWT_SECRET!))
        return NextResponse.redirect('/dashboard');
      } else{
        return NextResponse.redirect('/login');
      }
    }
  }

export const config = {
    matcher: ['/api/login', '/api/signup', '/api/dashboard'],
}