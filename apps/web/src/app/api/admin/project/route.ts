import { NextResponse } from "next/server"
import type { NextRequest } from "next/server";
import { connectToMongoDB } from "../../../../lib/database";
import Project from "../../../../models/Project";

connectToMongoDB();

// For creating a new Project
export async function POST(req: NextRequest) {
  try {
    const { name, description} = await req.json();
    const userId = req.headers.get('userId');
    const newProject = new Project({
      name,
      description,
      admin : userId,
    });

    const savedProject = await newProject.save();

    return  NextResponse.json({
        success:true,
        data: savedProject,
    }, {status : 200})
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({
        success: false,
        message: "Error in Creating a new Project",
    }, {status : 500});
  }
}

//For getting all project by an admin
//why GET req is  not working if userId not passed directly ??????
export async function PUT(req: NextRequest) {    
  const userId = req.headers.get('userId');
  try {
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "userID is missing.",
      }, { status: 400 });
    }

    const projects = await Project.find({ admin: userId });

    return NextResponse.json({
      success: true,
      data: projects,
      message: "Project fetched successfully",
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({
      success: false,
      message: "Error in fetching project",
    }, { status: 500 });
  }
}
