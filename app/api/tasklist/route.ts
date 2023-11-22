import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function GET() {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
    
}