import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mailSender } from "../../../../lib/mailsender";
import crypto from "crypto";
import Token from "../../../../models/Token";
 
export async function POST(req: NextRequest) {
    try {
        const { email, projectId} = await req.json();
        const userId = req.headers.get('userId');

        //generate token and save 
        const token:string = crypto.randomBytes(20).toString("hex");
        const newTokenData = new Token({
            email,
            projectId,
            token
        });
  
        const savedNewTokenData = await newTokenData.save();
        // Send the mail
        const url = "http://localhost:3000/acceptinvite"
        const emailRes = await mailSender(
            email,
			"Invitation to Join the team",
			`Your are invited to join the reshift team ${url}. Please click this link to accept the invite.Use this Token ${token}. If you are not registred then singup first`
        );

        return NextResponse.json({
            success: true,
            data: savedNewTokenData,
            message: 'Invitation sent successfully',
        }, { status: 200 });
        
    } catch (error) {
        console.error('Error sending mail:', error);
        return NextResponse.json({
            success: false,
            message: 'Error in sending mail',
        }, { status: 500 });
    }
}
