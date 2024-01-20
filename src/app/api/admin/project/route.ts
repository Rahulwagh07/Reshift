import { NextResponse } from "next/server"
import Project from "@/models/Project";
import type { NextRequest } from "next/server";
import { ACCOUNT_TYPE } from "@/lib/constants";
import { connectToMongoDB } from "@/lib/database";

connectToMongoDB();
// For creating a new Project
export async function POST(req: NextRequest) {
  try {

    const { name, description, members, tasks, user} = await req.json();
    // const userId = req.user.id;  //to do 

    //check user role
    if(user.accountType !== ACCOUNT_TYPE.ADMIN){
      return NextResponse.json({
        success: false,
        message: "User is not a admin",
      }, {status: 500})
    }

    //create a new project
    const newProject = new Project({
      name,
      description,
      admin : user?._id,
      members,
      tasks,
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    //Response with the saved project
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
export async function PUT(req: NextRequest) {   //why GET req is  not working if userId not passed directly ??????
  try {
    const {userId} = await req.json();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Invalid request payload. userID is missing.",
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
