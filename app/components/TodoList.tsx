"use client";

import React, { useState} from 'react';
import {FiEdit, FiTrash2} from "react-icons/fi";
import Modal from './Modal';
import { ITask } from '@/types/tasks';
import Task from './Task';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



interface TaskListProps {
    tasks: ITask[];
}

const  TodoList: React.FC<TaskListProps> = ({tasks}) => {
   
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
                <tr className='font-bold uppercase'>
                    <th>Ажлын нэр</th>
                    <th>Тайлбар</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <Task key={task.id} task={task} />
                ))}
                
            </tbody>
        </table>
    </div>
    </DndProvider>
  )
}

export default TodoList;