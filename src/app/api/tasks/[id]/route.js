import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function GET (request,{params}){
    
    const id =  parseInt(params.id, 10); //SE CONVIERTE A ENTERO

    const task = await prisma.task.findUnique({ //OBTENGO EL DATO CON LA ID DADA
        where: {
          id: id,
        },
      })


   return NextResponse.json(task)
}


export async function PUT (request,{params}){
    
    const data =  await request.json()

    const taskUpdated =await prisma.task.update({
        where:{
            id:Number(params.id),
        },
        data:data //actualiza segun el dato o datos pasados
    })



   return NextResponse.json({
        message:"Modificando tarea con id " + params.id,
        data:taskUpdated
    })
}

export async function DELETE (request,{params}){
    
   

    const taskRemoved = await prisma.task.delete({
        where: {
          id: Number(params.id),
        },
      })



   return NextResponse.json({
        message:"Borrando tarea con id " + params.id,
        data: taskRemoved
    })
}

