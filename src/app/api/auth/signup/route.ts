import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../../models/User";
import dotenv from "dotenv";
import { connectToMongoDB } from "@/config/database";

dotenv.config();
connectToMongoDB();

export async function POST(req: NextRequest){
  const reqBody = await req.json()
  try {
    
    const {name, email, password} = reqBody;
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: 'All Fields are required',
      }, { status: 403 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'User already exists',
      }, { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: 'User Registered successfully',
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: 'User cannot be registered. Please try again.',
    }, { status: 500 });
  }
};
