import { ITask } from "@/types/tasks";
const baseUrl = 'http://localhost:3000';

export const getTasks = async (): Promise<ITask[]> => { 
    const res = await fetch(`${baseUrl}/api/tasklist`, { cache: 'no-store' });
    const tasks = await res.json();
    return tasks;
}

export const editTask = async (task: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/api/tasklist/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const updatedTask = await res.json();
  return updatedTask;
}

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/api/tasklist/${id}`, {
    method: 'DELETE',
  })
}