import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectToMongoDB } from "../../../lib/database";
import Task from "../../../models/Task";

connectToMongoDB();

export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get('userId');
        const tasks = await Task.find({ assignedUser: userId });

        return NextResponse.json({
            success: true,
            data: tasks,
            message: "Tasks fetched successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in fetching tasks",
        }, { status: 500 });
    }
}
