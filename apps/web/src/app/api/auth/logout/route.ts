import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res:NextResponse) {
    const response = NextResponse.json({
        message: "User login successful",
        success: true,
    })
    response.cookies.delete('token');
    return  NextResponse.json({
        success: true,
        message: `Token deleted from cookies`,
        }, {status : 200});
}