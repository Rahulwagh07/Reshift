import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Token from "../../../models/Token";
import Project from "../../../models/Project";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, secretToken} = await req.json();
        const userId = req.headers.get('userId');

        // Find the respective token using email
        const tokenData = await Token.findOne({ email });

        if (!tokenData) {
            return NextResponse.json({
                success: false,
                message: 'Token not found for the given email',
            }, { status: 404 });
        }
         
        const { token } = tokenData;
        const { projectId } = tokenData;

        // Check if the token in the request body matches the token in the database
        if (token !== secretToken) {
            return NextResponse.json({
                success: false,
                message: 'Invalid Token',
            }, { status: 400 });
          
        }

        // Add the userId to the member array of the Project model
        const project = await Project.findById(projectId);

        if (!project) {
            if (!tokenData) {
                return NextResponse.json({
                    success: false,
                    message: 'Project not found',
                }, { status: 404 });
            }
        }

        project.members.push(userId);
        await project.save();

        return NextResponse.json({
            success: true,
            message: 'User added succesfully',
        }, { status: 200 });
      
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
        }, { status: 500 });
    }
}
