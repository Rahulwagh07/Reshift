import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res:NextResponse){
    const reqBody = await req.json();
    try{
        const {userId} = reqBody;
        console.log("UserId", userId);
        if(!userId) {
            return NextResponse.json({
                success:false,
                message: "Userid is not provided",
            })
        }
        const response = await User.findById({userId});
        return NextResponse.json({
            success: true,
            message:"User Found",
            data: response,
        })
        
    } catch(error){
        console.log("Error in getting the user details");
        console.log(error);
        return NextResponse.json({
            success:false,
        })
    }
}