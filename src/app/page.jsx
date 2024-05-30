import TaskCard from "@/components/taskCard";
import { prisma } from "@/libs/prisma"

async function loadTasks() {

  //haciendo una peticion http
  // const res = await fetch('http://localhost:3000/api/tasks')
  // const data = await res.json()

  //OBTENIENDO DESDE LA BASE DE DATOS 
  const data = await prisma.task.findMany();

  return data

}


async function HomePage() {
  const tasks = await loadTasks()
  return (

    <section className="container mx-auto" >
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map(task => (
          <TaskCard key={task.id}  task={task} />
        ))}

      </div>
    </section>

  )
}

export default HomePage