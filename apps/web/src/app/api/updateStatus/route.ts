import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectToMongoDB } from "../../../lib/database";
import Task from "../../../models/Task";

connectToMongoDB();

export async function PUT(req: NextRequest) {
    try {
        const { taskId, status } = await req.json();
    
        const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

        return NextResponse.json({
            success: true,
            data: updatedTask,
            message: "Task Status Updated",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in updating task status",
        }, { status: 500 });
    }
}
