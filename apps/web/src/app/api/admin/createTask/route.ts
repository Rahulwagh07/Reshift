import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Task from "../../../../models/Task";
import Project from "../../../../models/Project";
import { connectToMongoDB } from "../../../../lib/database";
import { ACCOUNT_TYPE } from "../../../../lib/constants";
connectToMongoDB();

//To add a new Task
export async function POST(req: NextRequest) {
    try {
        const { title, description, dueDate, priority, status, assignedUser, projectId } = await req.json();
        const userId = req.headers.get('userId');
        const accountType = req.headers.get('accountType');

        if (accountType !== ACCOUNT_TYPE.ADMIN) {
            return NextResponse.json({
                success: false,
                message: 'User is not an admin',
            }, { status: 500 });
        }

        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
            assignedUser,
        });

        const savedTask = await newTask.save();
        
        const project = await Project.findById(projectId);
        if (!project) {
            return NextResponse.json({
                success: false,
                message: 'Project not found',
            }, { status: 404 });
        }

        project.tasks.push(savedTask._id);  
        await project.save();

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

        if (!projectId) {
            return NextResponse.json({
                success: false,
                message: "Project ID is missing or empty.",
            }, { status: 400 });
        }

        const project = await Project.findById(projectId)
            .populate({
                path: 'tasks',
                select: '',
                populate: {
                    path: 'assignedUser',
                    select: '-password'
                }
            });

        if (!project) {
            return NextResponse.json({
                success: false,
                message: "Project not found.",
            }, { status: 404 });
        }
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


