import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Project from "../../../../models/Project";
import { connectToMongoDB } from "../../../../lib/database";
connectToMongoDB()
 
export async function POST(req: NextRequest) {
    try {
        const { projectId } = await req.json();
        
        if (!projectId) {
            return NextResponse.json({
                success: false,
                message: "Project id is missing",
            }, { status: 400 });
        }

        const membersData = await Project.findById(projectId)
            .populate({
                path: 'members',
                select: '-password'
            });

        if (!membersData) {
            return NextResponse.json({
                success: false,
                message: "Project not found",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: membersData,
            message: "MembersData fetched successfully",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Error in fetching Members ${error}`,
        }, { status: 500 });
    }
}
