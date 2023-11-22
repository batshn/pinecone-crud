import Task from "@/app/components/Task";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


interface IParams {
    taskid?: string;
  }


export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {

    const { taskid } = params;   
  
    if (!taskid || typeof taskid !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const task = await prisma.task.deleteMany({
      where: {
        id: taskid
      }
    });
  
    return NextResponse.json({ message: "Амжилттай" }, { status: 200 });
}



export async function PUT(
    request: Request, 
    { params }: { params: IParams }
  ) {
   
    const { taskid } = params;
    const body = await request.json();
    const {
        taskTitle,
        taskDescription,
        status
    } = body;
  
    if (!taskid || typeof taskid !== 'string') {
      throw new Error('Invalid ID');
    }
  
  
    const task = await prisma.task.update({
      where: {
        id: taskid
      },
      data: {
        taskTitle,
        taskDescription,
        status
      }
    });
  
    return NextResponse.json({ message: "Амжилттай" }, { status: 200 });
  }

