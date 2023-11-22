import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getTasks } from "@/app/actions/crudTasks";

export default async function Home() {
  const tasks = await getTasks();
  return (
    <main className='max-w-5xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
          <h1 className='text-2xl font-bold' >Ажлын жагсаалт - PineCone</h1>
          <AddTask/>
      </div>
          <TodoList tasks={tasks} />
    </main>
  )
}
