import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../../models/User";
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import { connectToMongoDB } from "@/config/database";

dotenv.config();
connectToMongoDB();
export async function POST(req: NextRequest){
     
    const reqBody = await req.json()
	try {
		const { email, password} : { email: string, password: string } = reqBody;
		if (!email || !password) {
			return NextResponse.json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			}, { status: 400 });
		}

		// find  the user  
		const user = await User.findOne({ email });

		// If user not found  
		if (!user) {
			return NextResponse.json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			}, { status : 401});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET!,
				{
					expiresIn: "24h",
				}
			);
			// Save token to user document in database
			user.token= token;
			user.password = undefined;
		
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			

            const response = NextResponse.json({
				message: "User login successful",
				success: true,
				user: user,
				token: token,
			})
			response.cookies.set("token", token, {
				httpOnly: true,
			})
			return response;

		} else {
			return  NextResponse.json({
				success: false,
				message: `Password is incorrect`,
			}, {status : 401});
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			success: false,
			message: `Login Failure Please Try Again`,
		}, { status: 500});
	}
};

