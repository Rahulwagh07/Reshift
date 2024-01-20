import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';
import { getJwtSecretKey } from './lib/getJwtSecretKey';


export async function middleware(request: NextRequest) {
 
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup'

  const token = request.cookies.get('token')?.value || request.headers.get("Authorization")?.replace("Bearer ", "") || ''

  if(isPublicPath && token) {
    try{
        const decodedPayload = await jwtVerify(token, getJwtSecretKey());
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    } catch(error){
        return NextResponse.json({
            success:false,
            message:"JWT VERIFICATION FAILED"
        })
    }
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/login',
    '/signup'
  ]
}