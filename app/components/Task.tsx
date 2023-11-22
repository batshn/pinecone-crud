"use client";

import { ITask } from "@/types/tasks";
import { ChangeEvent, FormEventHandler, useState, useRef } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTask, editTask } from "@/app/actions/crudTasks";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task}) => {

  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  const [taskEditTitle, setTaskEditTitle] = useState<string>(task.taskTitle);
  const [taskEditDesc, setTaskEditDesc] = useState<string>(task.taskDescription);
  const [taskEditStatus, setTaskEditStatus] = useState<boolean>(task.status);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmitEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await editTask({
      id: task.id,
      taskTitle: taskEditTitle,
      taskDescription: taskEditDesc,
      status:  taskEditStatus
    });
    setOpenModalEdit(false);
    router.refresh();
    setIsLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskEditStatus(event.target.checked);
  };
  

  return (
    <tr 
      key={task.id} 
      className={task.status ? 'line-through': ''} 
    >
      <td >{task.taskTitle}</td>
      <td >{task.taskDescription}</td>
      <td className='flex gap-5 justify-end'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTask}>
            <h3 className='font-bold text-lg'>Засварлах</h3>
            <div className='modal-action flex flex-col gap-4 items-center'>
              <input
                value={taskEditTitle}
                onChange={(e) => setTaskEditTitle(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <input
                value={taskEditDesc}
                onChange={(e) => setTaskEditDesc(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <label className="cursor-pointer label">
                <input 
                  onChange={handleCheckboxChange}
                  checked={taskEditStatus}
                  type="checkbox" 
                  className="checkbox mr-2"                     
                />
                <span className="label-text">Хийгдсэн</span>
              </label>
              <button type='submit' className='btn btn-neutral w-full'>
                {isLoading && (<span className="loading loading-spinner"></span> )}
                Хадгалах
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Устгах үйлдэл хийхдээ итгэлтэй байна уу?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn'>
              Тийм
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  
  );
};

export default Task;



