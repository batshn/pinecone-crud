"use client";

import { AiOutlinePlus} from "react-icons/ai";
import Modal from "./Modal";
import React, { FormEventHandler, useState,ChangeEvent  } from "react";
import { useRouter } from "next/navigation";


const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [status, setStatus] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();
      
        if(!taskTitle || !taskDescription) {
            alert("Мэдээлэл оруулна уу !");
            return ;
        }
        setIsLoading(true);
        try {
           const res = await fetch('http://localhost:3000/api/addtask',{
                method:"POST",
                headers: {
                    "Content-type": "application/json"
                },
                body : JSON.stringify({taskTitle, taskDescription,status })
            });
          
            if(res.ok) {
                setTaskTitle("");
                setTaskDescription("");
                setStatus(false)
                setModalOpen(false);
                router.refresh();
            } else {
                throw new Error("Алдаа гарлаа !");
            }

            setIsLoading(false);
        } catch(error){
            console.log(error);
        }
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.checked);
      };

  return (
    <div>
        <button onClick={() => setModalOpen(true)} className="btn btn-neutral w-full">
            ШИНЭ АЖИЛ НЭМЭХ <AiOutlinePlus size={20} className="ml-2"/>
        </button>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <form onSubmit={handleSubmit}>
                <h3 className="font-semibold  text-lg">Ажил оруулах</h3>
                <div className="flex flex-col gap-3 items-center modal-action">
                    <input 
                        value={taskTitle}
                        onChange={e=> setTaskTitle(e.target.value)}
                        type="text" 
                        placeholder="Ажлын нэр" 
                        className="input input-bordered w-full" 
                    />
                     <input 
                        value={taskDescription}
                        onChange={e=> setTaskDescription(e.target.value)}
                        type="text" 
                        placeholder="Тайлбар" 
                        className="input input-bordered w-full" 
                    />
                    <label className="cursor-pointer label">
                        <input 
                            onChange={handleCheckboxChange}
                            checked={status}
                            type="checkbox" 
                            className="checkbox mr-2"                     
                        />
                        <span className="label-text">Хийгдсэн</span>
                    </label>
                    <button type="submit" className="btn btn-neutral w-full">
                        {isLoading && (<span className="loading loading-spinner"></span> )}
                        Хадгалах
                    </button>
                </div>
            </form>
         </Modal>
    </div>
  )
}

export default AddTask;