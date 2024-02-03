import { NextResponse } from "next/server";
import Project from "@/models/Project";
import Task from "@/models/Task";
import type { NextRequest } from "next/server";
import { ACCOUNT_TYPE } from "@/lib/constants";
import { connectToMongoDB } from "@/lib/database";
 
connectToMongoDB();

//To add a new Task
export async function POST(req: NextRequest) {
    try {
        const { title, description, dueDate, priority, status, assignedUser, comments, projectId } = await req.json();
        const userId = req.headers.get('userId');
        const accountType = req.headers.get('accountType');

        if (accountType !== ACCOUNT_TYPE.ADMIN) {
            return NextResponse.json({
                success: false,
                message: 'User is not an admin',
            }, { status: 500 });
        }

        // Create a new task
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
            assignedUser,
            comments,
        });

        // Save the task to the database
        const savedTask = await newTask.save();
        
        // Find the project by projectId and update to include taskId
        const project = await Project.findById(projectId);
        if (!project) {
            return NextResponse.json({
                success: false,
                message: 'Project not found',
            }, { status: 404 });
        }

        project.tasks.push(savedTask._id);  
        await project.save();

        // Response with the saved task
        return NextResponse.json({
            success: true,
            data: savedTask,
        }, { status: 200 });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json({
            success: false,
            message: 'Error in creating a new task',
        }, { status: 500 });
    }
}

//to get all task for a specific project
export async function PUT(req: NextRequest) {
    try {
        const { projectId } = await req.json();

        // Check if projectId is missing 
        if (!projectId) {
            return NextResponse.json({
                success: false,
                message: "Project ID is missing or empty.",
            }, { status: 400 });
        }

        // const project = await Project.findById(projectId).populate('tasks');
        const project = await Project.findById(projectId)
            .populate({
                path: 'tasks',
                select: '',
                populate: {
                    path: 'assignedUser',
                    select: ''
                }
            });

        if (!project) {
            return NextResponse.json({
                success: false,
                message: "Project not found.",
            }, { status: 404 });
        }

        // get the tasks from the project
        const tasks = project.tasks;

        return NextResponse.json({
            success: true,
            data: tasks,
            message: "Tasks fetched successfully",
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({
            success: false,
            message: "Error in fetching tasks",
        }, { status: 500 });
    }
}


