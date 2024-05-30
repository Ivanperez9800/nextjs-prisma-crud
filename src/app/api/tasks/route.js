
import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";



export async function GET (){
    
   const tasks= await prisma.task.findMany();
   console.log(tasks);
    return NextResponse.json(tasks)
}

export async function POST (request){

    const {title,description} = await request.json() //OBTENGO LOS DATOS PASADOS
    const newTask = await prisma.task.create({ //GUARDO LA TAREA EN LA BASE DE DATOS
        data:{
            title,
            description
        }
    })


    return NextResponse.json({
        message:"Creando tareas",
        data:newTask
    })
}
