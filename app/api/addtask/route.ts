import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";


export async function POST( request: Request) {
    const body = await request.json();
    const {
        taskTitle,
        taskDescription,
        status
    } = body;

    
    const task = await prisma.task.create({
        data: {
            taskTitle,
            taskDescription,
            status,
        }
    });
    return NextResponse.json({message: "Амжилттай"}, {status: 201});
}